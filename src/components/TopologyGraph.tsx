// src/components/TopologyGraph.tsx
// Canvas-based topology graph with group highlighting, physics simulation, and drag support.
import { useCallback, useEffect, useMemo, useRef } from 'react'

/* ── Types ───────────────────────────── */

export interface TopologyNode {
  id: string
  label: string
  x: number
  y: number
  type: 'core' | 'primary' | 'child' | 'decorative'
  group?: string
  parentId?: string
}

export interface TopologyEdge {
  from: string
  to: string
  style: 'solid' | 'dashed' | 'thin-dashed'
}

interface TopologyGraphProps {
  nodes: TopologyNode[]
  edges: TopologyEdge[]
  activeGroup?: string | null
  selectedNodeId?: string | null
  highlightMode?: 'hover' | 'click'
  onNodeClick?: (node: TopologyNode) => void
  groupColors?: Record<string, string>
  width?: number
  height?: number
  theme?: 'light' | 'dark'
}

/* ── Constants ───────────────────────── */

const NODE_SIZES: Record<TopologyNode['type'], number> = {
  core: 24,
  primary: 13,
  child: 8,
  decorative: 5,
}

const DEFAULT_COLORS: Record<TopologyNode['type'], string> = {
  core: '#8b9bab',
  primary: '#a8937e',
  child: '#8bab98',
  decorative: '#6b7b8a',
}

const GLOW_COLORS: Record<TopologyNode['type'], string> = {
  core: 'rgba(139, 155, 171, 0.45)',
  primary: 'rgba(168, 147, 126, 0.35)',
  child: 'rgba(139, 171, 152, 0.3)',
  decorative: 'rgba(107, 123, 138, 0.15)',
}

const LIGHT_COLORS: Record<TopologyNode['type'], string> = {
  core: '#6b7b8d',
  primary: '#9b7b6b',
  child: '#7b9b8b',
  decorative: '#a8a090',
}

/* ── Pure utilities (exported for testing) ── */

export function computeTransform(
  nodes: TopologyNode[],
  canvasW: number,
  canvasH: number,
  padding = 50,
) {
  if (nodes.length === 0) return { sx: 1, sy: 1, ox: 0, oy: 0 }
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity
  for (const n of nodes) {
    if (n.x < minX) minX = n.x
    if (n.x > maxX) maxX = n.x
    if (n.y < minY) minY = n.y
    if (n.y > maxY) maxY = n.y
  }
  const dataW = maxX - minX || 1
  const dataH = maxY - minY || 1
  const drawW = canvasW - padding * 2
  const drawH = canvasH - padding * 2
  const scale = Math.min(drawW / dataW, drawH / dataH)
  const ox = padding + (drawW - dataW * scale) / 2 - minX * scale
  const oy = padding + (drawH - dataH * scale) / 2 - minY * scale
  return { sx: scale, sy: scale, ox, oy }
}

type PhysicsNode = TopologyNode & { vx: number; vy: number }

const MAX_VELOCITY = 8
const MIN_DIST = 30 // prevent extreme forces when overlapping

export function applyPhysics(
  nodes: PhysicsNode[],
  edges: TopologyEdge[],
  damping: number,
  bounds?: { width: number; height: number; padding: number },
) {
  const REPULSION = 5000
  const SPRING_K = 0.008
  const SPRING_REST = 80
  const DRIFT = 0.02

  // Repulsion (inverse-square)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      let dx = b.x - a.x
      let dy = b.y - a.y
      // Jitter overlapping nodes apart
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        dx = (Math.random() - 0.5) * 2
        dy = (Math.random() - 0.5) * 2
      }
      const distSq = Math.max(dx * dx + dy * dy, MIN_DIST * MIN_DIST)
      const dist = Math.sqrt(distSq)
      const force =
        REPULSION /
        distSq *
        (a.type === 'decorative' || b.type === 'decorative' ? 0.5 : 1)
      const fx = (dx / dist) * force
      const fy = (dy / dist) * force
      a.vx -= fx
      a.vy -= fy
      b.vx += fx
      b.vy += fy
    }
  }

  // Spring attraction along edges
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  for (const edge of edges) {
    const a = nodeMap.get(edge.from)
    const b = nodeMap.get(edge.to)
    if (!a || !b) continue
    const dx = b.x - a.x
    const dy = b.y - a.y
    const dist = Math.sqrt(dx * dx + dy * dy) + 0.1
    const displacement = dist - SPRING_REST
    const fx = (dx / dist) * displacement * SPRING_K
    const fy = (dy / dist) * displacement * SPRING_K
    a.vx += fx
    a.vy += fy
    b.vx -= fx
    b.vy -= fy
  }

  // Damping + drift + velocity cap + position update + boundary clamping
  for (const node of nodes) {
    // Tiny random drift for "breathing"
    node.vx += (Math.random() - 0.5) * DRIFT
    node.vy += (Math.random() - 0.5) * DRIFT

    node.vx *= damping
    node.vy *= damping

    // Clamp velocity
    const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
    if (speed > MAX_VELOCITY) {
      node.vx = (node.vx / speed) * MAX_VELOCITY
      node.vy = (node.vy / speed) * MAX_VELOCITY
    }

    // NaN guard
    if (!isFinite(node.vx)) node.vx = 0
    if (!isFinite(node.vy)) node.vy = 0

    node.x += node.vx
    node.y += node.vy

    // Boundary clamping
    if (bounds) {
      const p = bounds.padding
      node.x = Math.max(p, Math.min(bounds.width - p, node.x))
      node.y = Math.max(p, Math.min(bounds.height - p, node.y))
    }
  }
}

export function hitTestNode(
  nodes: TopologyNode[],
  mx: number,
  my: number,
): TopologyNode | null {
  for (const node of nodes) {
    if (node.type === 'decorative') continue
    const r = NODE_SIZES[node.type] + 10
    const dx = node.x - mx
    const dy = node.y - my
    if (dx * dx + dy * dy < r * r) return node
  }
  return null
}

/* ── Component ───────────────────────── */

export function TopologyGraph({
  nodes,
  edges,
  activeGroup,
  highlightMode = 'hover',
  onNodeClick,
  groupColors,
  width = 600,
  height = 460,
  theme = 'dark',
}: TopologyGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)

  // Physics state: nodes in CANVAS coordinates (mapped once at init)
  const physicsNodes = useRef<PhysicsNode[]>([])
  const edgesRef = useRef(edges)
  const activeGroupRef = useRef(activeGroup)
  const dragRef = useRef<{ nodeId: string; offsetX: number; offsetY: number } | null>(null)
  const didDragRef = useRef(false)

  // Initialize: map logical coords → canvas coords once
  useEffect(() => {
    const t = computeTransform(nodes, width, height, 52)
    physicsNodes.current = nodes.map((n) => ({
      ...n,
      x: n.x * t.sx + t.ox,
      y: n.y * t.sy + t.oy,
      vx: 0,
      vy: 0,
    }))
  }, [nodes, width, height])

  edgesRef.current = edges
  activeGroupRef.current = activeGroup

  const isLight = theme === 'light'

  const getNodeColor = useCallback(
    (node: TopologyNode) => {
      if (groupColors && node.group && groupColors[node.group]) {
        return groupColors[node.group]
      }
      return isLight ? LIGHT_COLORS[node.type] : DEFAULT_COLORS[node.type]
    },
    [groupColors, isLight],
  )

  const isHighlighted = useCallback(
    (node: TopologyNode) => {
      if (!activeGroupRef.current) return true
      if (node.type === 'core') return true
      return node.group === activeGroupRef.current
    },
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const physicsBounds = { width, height, padding: 30 }

    const draw = () => {
      timeRef.current += 0.01
      const t = timeRef.current
      const pNodes = physicsNodes.current
      if (pNodes.length === 0) {
        animRef.current = requestAnimationFrame(draw)
        return
      }

      // Apply physics — pin dragged node
      const dragId = dragRef.current?.nodeId
      if (dragId) {
        const dragNode = pNodes.find((n) => n.id === dragId)
        const savedX = dragNode?.x ?? 0
        const savedY = dragNode?.y ?? 0
        applyPhysics(pNodes, edgesRef.current, 0.85, physicsBounds)
        if (dragNode) {
          dragNode.x = savedX
          dragNode.y = savedY
          dragNode.vx = 0
          dragNode.vy = 0
        }
      } else {
        applyPhysics(pNodes, edgesRef.current, 0.85, physicsBounds)
      }

      // Nodes are already in canvas coordinates — draw directly
      ctx.clearRect(0, 0, width, height)

      const nodeMap = new Map(pNodes.map((n) => [n.id, n]))

      // Draw edges
      for (const edge of edgesRef.current) {
        const from = nodeMap.get(edge.from)
        const to = nodeMap.get(edge.to)
        if (!from || !to) continue

        const fromHL = isHighlighted(from)
        const toHL = isHighlighted(to)
        const edgeHL = fromHL && toHL

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)

        if (edge.style === 'dashed') {
          ctx.setLineDash([5, 3])
          ctx.lineWidth = edgeHL ? 1 : 0.4
        } else if (edge.style === 'thin-dashed') {
          ctx.setLineDash([2, 4])
          ctx.lineWidth = edgeHL ? 0.6 : 0.25
        } else {
          ctx.setLineDash([])
          ctx.lineWidth = edgeHL ? 1.2 : 0.6
        }

        ctx.strokeStyle = edgeHL
          ? isLight
            ? 'rgba(100, 116, 139, 0.35)'
            : 'rgba(148, 163, 184, 0.35)'
          : isLight
            ? 'rgba(100, 116, 139, 0.1)'
            : 'rgba(148, 163, 184, 0.08)'
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Draw nodes (text only, no circles)
      for (const node of pNodes) {
        const hl = isHighlighted(node)
        const color = getNodeColor(node)
        const nx = node.x
        const ny = node.y

        // Label
        if (node.type !== 'decorative' || hl) {
          ctx.font =
            node.type === 'core'
              ? 'bold 14px "Inter", sans-serif'
              : node.type === 'primary'
                ? '600 12px "Inter", sans-serif'
                : '11px "Inter", sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          if (hl) {
            ctx.fillStyle = node.type === 'decorative'
              ? (isLight ? 'rgba(26, 20, 9, 0.35)' : 'rgba(226, 232, 240, 0.35)')
              : color
          } else {
            ctx.fillStyle = isLight
              ? 'rgba(26, 20, 9, 0.2)'
              : 'rgba(226, 232, 240, 0.15)'
          }

          ctx.fillText(node.label, nx, ny)
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [width, height, getNodeColor, isHighlighted, isLight])

  /* ── Mouse interaction (all in canvas space) ── */

  const getCanvasPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return { x: 0, y: 0 }
      const rect = canvas.getBoundingClientRect()
      return {
        x: (e.clientX - rect.left) * (width / rect.width),
        y: (e.clientY - rect.top) * (height / rect.height),
      }
    },
    [width, height],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const pos = getCanvasPos(e)
      const hit = hitTestNode(physicsNodes.current, pos.x, pos.y)
      if (hit) {
        dragRef.current = { nodeId: hit.id, offsetX: pos.x - hit.x, offsetY: pos.y - hit.y }
        didDragRef.current = false
        const pNode = physicsNodes.current.find((n) => n.id === hit.id)
        if (pNode) { pNode.vx = 0; pNode.vy = 0 }
      }
    },
    [getCanvasPos],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!dragRef.current) return
      didDragRef.current = true
      const pos = getCanvasPos(e)
      const pNode = physicsNodes.current.find((n) => n.id === dragRef.current!.nodeId)
      if (pNode) {
        pNode.x = pos.x - dragRef.current.offsetX
        pNode.y = pos.y - dragRef.current.offsetY
        pNode.vx = 0
        pNode.vy = 0
      }
    },
    [getCanvasPos],
  )

  const handleMouseUp = useCallback(() => {
    if (dragRef.current) {
      dragRef.current = null
    }
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      // Skip click if we just dragged
      if (didDragRef.current) { didDragRef.current = false; return }
      if (!onNodeClick || highlightMode !== 'click') return
      const pos = getCanvasPos(e)
      const hit = hitTestNode(physicsNodes.current, pos.x, pos.y)
      if (hit) onNodeClick(hit)
    },
    [onNodeClick, highlightMode, getCanvasPos],
  )

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        cursor: dragRef.current ? 'grabbing' : highlightMode === 'click' ? 'pointer' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    />
  )
}
