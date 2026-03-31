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
  core: '#3b82f6',
  primary: '#a855f7',
  child: '#22c55e',
  decorative: '#475569',
}

const GLOW_COLORS: Record<TopologyNode['type'], string> = {
  core: 'rgba(59, 130, 246, 0.5)',
  primary: 'rgba(168, 85, 247, 0.4)',
  child: 'rgba(34, 197, 94, 0.3)',
  decorative: 'rgba(71, 85, 105, 0.2)',
}

const LIGHT_COLORS: Record<TopologyNode['type'], string> = {
  core: '#2266ee',
  primary: '#8844dd',
  child: '#109980',
  decorative: '#8899b0',
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

export function applyPhysics(
  nodes: PhysicsNode[],
  edges: TopologyEdge[],
  damping: number,
) {
  const REPULSION = 800
  const SPRING_K = 0.005
  const SPRING_REST = 120

  // Repulsion (inverse-square)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      let dx = b.x - a.x
      let dy = b.y - a.y
      const distSq = dx * dx + dy * dy + 1
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

  // Damping + position update
  for (const node of nodes) {
    node.vx *= damping
    node.vy *= damping
    node.x += node.vx
    node.y += node.vy
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

  // Physics state: clone nodes with velocity
  const physicsNodes = useRef<PhysicsNode[]>([])
  const edgesRef = useRef(edges)
  const activeGroupRef = useRef(activeGroup)
  const dragRef = useRef<{ nodeId: string; offsetX: number; offsetY: number } | null>(null)

  // Initialize physics nodes when input nodes change
  useEffect(() => {
    physicsNodes.current = nodes.map((n) => ({
      ...n,
      vx: 0,
      vy: 0,
    }))
  }, [nodes])

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

  // Canvas → node coordinate helpers
  const canvasToNode = useCallback(
    (cx: number, cy: number, transform: { sx: number; ox: number; sy: number; oy: number }) => {
      return {
        x: (cx - transform.ox) / transform.sx,
        y: (cy - transform.oy) / transform.sy,
      }
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

    const draw = () => {
      timeRef.current += 0.01
      const t = timeRef.current
      const pNodes = physicsNodes.current
      if (pNodes.length === 0) {
        animRef.current = requestAnimationFrame(draw)
        return
      }

      // Apply physics (skip for dragged node)
      if (!dragRef.current) {
        applyPhysics(pNodes, edgesRef.current, 0.85)
      } else {
        // Still apply physics but pin the dragged node
        const dragId = dragRef.current.nodeId
        const dragNode = pNodes.find((n) => n.id === dragId)
        const savedX = dragNode?.x ?? 0
        const savedY = dragNode?.y ?? 0
        applyPhysics(pNodes, edgesRef.current, 0.85)
        if (dragNode) {
          dragNode.x = savedX
          dragNode.y = savedY
          dragNode.vx = 0
          dragNode.vy = 0
        }
      }

      // Compute transform from current physics positions
      const transform = computeTransform(pNodes, width, height, 52)

      const tx = (x: number) => x * transform.sx + transform.ox
      const ty = (y: number) => y * transform.sy + transform.oy

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
        ctx.moveTo(tx(from.x), ty(from.y))
        ctx.lineTo(tx(to.x), ty(to.y))

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

      // Draw nodes
      for (const node of pNodes) {
        const hl = isHighlighted(node)
        const r = NODE_SIZES[node.type]
        const color = getNodeColor(node)
        const alpha = hl ? 1 : 0.18
        const nx = tx(node.x)
        const ny = ty(node.y)

        // Glow
        if (hl && node.type !== 'decorative') {
          const glowR = r * 2.5
          const gradient = ctx.createRadialGradient(nx, ny, r * 0.5, nx, ny, glowR)
          gradient.addColorStop(0, GLOW_COLORS[node.type])
          gradient.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(nx, ny, glowR, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Pulse for core node
        if (node.type === 'core') {
          const pulse = Math.sin(t * 2) * 0.15 + 1
          const pulseR = r * pulse * 1.8
          const gradient = ctx.createRadialGradient(nx, ny, r, nx, ny, pulseR)
          gradient.addColorStop(
            0,
            isLight ? 'rgba(34, 102, 238, 0.15)' : 'rgba(59, 130, 246, 0.2)',
          )
          gradient.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(nx, ny, pulseR, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(nx, ny, r, 0, Math.PI * 2)
        ctx.globalAlpha = alpha
        ctx.fillStyle = color
        ctx.fill()
        ctx.globalAlpha = 1

        // Label
        if (node.type !== 'decorative' || hl) {
          ctx.font =
            node.type === 'core'
              ? 'bold 12px "Inter", sans-serif'
              : node.type === 'primary'
                ? '11px "Inter", sans-serif'
                : '9px "Inter", sans-serif'
          ctx.textAlign = 'center'
          ctx.fillStyle = hl
            ? isLight
              ? 'rgba(13, 21, 37, 0.85)'
              : 'rgba(226, 232, 240, 0.85)'
            : isLight
              ? 'rgba(13, 21, 37, 0.25)'
              : 'rgba(226, 232, 240, 0.2)'
          ctx.fillText(node.label, nx, ny + r + 14)
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [width, height, getNodeColor, isHighlighted, isLight])

  /* ── Mouse interaction ─────────────── */

  const getMousePos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current!.getBoundingClientRect()
      const scaleX = width / rect.width
      const scaleY = height / rect.height
      return {
        canvasX: (e.clientX - rect.left) * scaleX,
        canvasY: (e.clientY - rect.top) * scaleY,
      }
    },
    [width, height],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const { canvasX, canvasY } = getMousePos(e)
      const pNodes = physicsNodes.current
      const transform = computeTransform(pNodes, width, height, 52)
      const { x: nx, y: ny } = canvasToNode(canvasX, canvasY, transform)
      const hit = hitTestNode(pNodes, nx, ny)
      if (hit) {
        dragRef.current = { nodeId: hit.id, offsetX: nx - hit.x, offsetY: ny - hit.y }
        const pNode = pNodes.find((n) => n.id === hit.id)
        if (pNode) {
          pNode.vx = 0
          pNode.vy = 0
        }
      }
    },
    [getMousePos, width, height, canvasToNode],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!dragRef.current) return
      const { canvasX, canvasY } = getMousePos(e)
      const pNodes = physicsNodes.current
      const transform = computeTransform(pNodes, width, height, 52)
      const { x: nx, y: ny } = canvasToNode(canvasX, canvasY, transform)
      const pNode = pNodes.find((n) => n.id === dragRef.current!.nodeId)
      if (pNode) {
        pNode.x = nx - dragRef.current.offsetX
        pNode.y = ny - dragRef.current.offsetY
      }
    },
    [getMousePos, width, height, canvasToNode],
  )

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (dragRef.current) {
        dragRef.current = null
        return
      }
    },
    [],
  )

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!onNodeClick || highlightMode !== 'click') return
      const { canvasX, canvasY } = getMousePos(e)
      const pNodes = physicsNodes.current
      const transform = computeTransform(pNodes, width, height, 52)
      const { x: nx, y: ny } = canvasToNode(canvasX, canvasY, transform)
      const hit = hitTestNode(pNodes, nx, ny)
      if (hit) onNodeClick(hit)
    },
    [onNodeClick, highlightMode, getMousePos, width, height, canvasToNode],
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
