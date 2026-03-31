import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  TopologyGraph,
  computeTransform,
  applyPhysics,
  hitTestNode,
} from './TopologyGraph'
import type { TopologyNode, TopologyEdge } from './TopologyGraph'

/* ── computeTransform ────────────────── */
describe('computeTransform', () => {
  const nodes: TopologyNode[] = [
    { id: 'a', label: 'A', x: 0, y: 0, type: 'core' },
    { id: 'b', label: 'B', x: 100, y: 100, type: 'primary' },
  ]

  it('returns identity-like transform for empty nodes', () => {
    const t = computeTransform([], 600, 400)
    expect(t.sx).toBe(1)
    expect(t.sy).toBe(1)
  })

  it('scales nodes to fit within canvas with padding', () => {
    const t = computeTransform(nodes, 600, 400, 50)
    // data range: 100x100, draw area: 500x300, scale = min(5, 3) = 3
    expect(t.sx).toBe(3)
    expect(t.sy).toBe(3)
  })

  it('centers nodes in the available space', () => {
    const t = computeTransform(nodes, 600, 400, 50)
    // After scale 3: data occupies 300x300, draw area 500x300
    // ox = 50 + (500-300)/2 - 0*3 = 150
    // oy = 50 + (300-300)/2 - 0*3 = 50
    expect(t.ox).toBe(150)
    expect(t.oy).toBe(50)
  })
})

/* ── applyPhysics ────────────────────── */
describe('applyPhysics', () => {
  it('applies repulsion between close nodes', () => {
    const nodes: (TopologyNode & { vx: number; vy: number })[] = [
      { id: 'a', label: 'A', x: 100, y: 100, type: 'primary', vx: 0, vy: 0 },
      { id: 'b', label: 'B', x: 102, y: 100, type: 'primary', vx: 0, vy: 0 },
    ]
    applyPhysics(nodes, [], 0.85)
    // Nodes should be pushed apart (a left, b right)
    expect(nodes[0].vx).toBeLessThan(0)
    expect(nodes[1].vx).toBeGreaterThan(0)
  })

  it('applies spring attraction along edges', () => {
    const nodes: (TopologyNode & { vx: number; vy: number })[] = [
      { id: 'a', label: 'A', x: 0, y: 0, type: 'core', vx: 0, vy: 0 },
      { id: 'b', label: 'B', x: 300, y: 0, type: 'primary', vx: 0, vy: 0 },
    ]
    const edges: TopologyEdge[] = [{ from: 'a', to: 'b', style: 'solid' }]
    applyPhysics(nodes, edges, 0.85)
    // Nodes should be pulled toward each other
    expect(nodes[0].vx).toBeGreaterThan(0)
    expect(nodes[1].vx).toBeLessThan(0)
  })

  it('applies damping to velocities', () => {
    const nodes: (TopologyNode & { vx: number; vy: number })[] = [
      { id: 'a', label: 'A', x: 100, y: 100, type: 'core', vx: 10, vy: 10 },
    ]
    applyPhysics(nodes, [], 0.85)
    // After damping, velocity magnitude should decrease
    // vx is damped: 10 * 0.85 = 8.5 (plus any repulsion, but single node = no repulsion)
    expect(Math.abs(nodes[0].vx)).toBeLessThan(10)
    expect(Math.abs(nodes[0].vy)).toBeLessThan(10)
  })

  it('updates positions from velocities', () => {
    const nodes: (TopologyNode & { vx: number; vy: number })[] = [
      { id: 'a', label: 'A', x: 100, y: 100, type: 'core', vx: 5, vy: -3 },
    ]
    applyPhysics(nodes, [], 0.85)
    // Position should change in direction of velocity
    expect(nodes[0].x).not.toBe(100)
    expect(nodes[0].y).not.toBe(100)
  })
})

/* ── hitTestNode ─────────────────────── */
describe('hitTestNode', () => {
  const nodes: TopologyNode[] = [
    { id: 'a', label: 'A', x: 100, y: 100, type: 'core' },
    { id: 'b', label: 'B', x: 300, y: 300, type: 'decorative' },
  ]

  it('returns node when click is within radius', () => {
    const hit = hitTestNode(nodes, 102, 98)
    expect(hit?.id).toBe('a')
  })

  it('returns null when click misses all nodes', () => {
    const hit = hitTestNode(nodes, 500, 500)
    expect(hit).toBeNull()
  })

  it('skips decorative nodes', () => {
    const hit = hitTestNode(nodes, 300, 300)
    expect(hit).toBeNull()
  })
})

/* ── Component renders ───────────────── */
describe('TopologyGraph component', () => {
  it('renders a canvas element', () => {
    // Mock canvas context since jsdom doesn't support it
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      scale: vi.fn(),
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      stroke: vi.fn(),
      fillText: vi.fn(),
      setLineDash: vi.fn(),
      createRadialGradient: vi.fn().mockReturnValue({
        addColorStop: vi.fn(),
      }),
      set lineWidth(_: number) {},
      set strokeStyle(_: string) {},
      set fillStyle(_: string) {},
      set globalAlpha(_: number) {},
      set font(_: string) {},
      set textAlign(_: string) {},
    }) as unknown as typeof HTMLCanvasElement.prototype.getContext

    const nodes: TopologyNode[] = [
      { id: 'a', label: 'A', x: 0, y: 0, type: 'core' },
    ]
    const edges: TopologyEdge[] = []

    const { container } = render(
      <TopologyGraph nodes={nodes} edges={edges} theme="dark" />
    )
    expect(container.querySelector('canvas')).toBeTruthy()
  })
})
