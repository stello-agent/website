import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { TopologyNode, TopologyEdge } from '../data/hero'

interface TopologyGraphProps {
  nodes: TopologyNode[]
  edges: TopologyEdge[]
  activeGroup?: string | null
  highlightMode?: 'hover' | 'click'
  onNodeClick?: (node: TopologyNode) => void
  groupColors?: Record<string, string>
  width?: number
  height?: number
}

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

/** Auto-fit: compute scale + offset so all nodes sit inside canvas with padding */
function computeTransform(
  nodes: TopologyNode[],
  canvasW: number,
  canvasH: number,
  padding = 50
) {
  if (nodes.length === 0) return { sx: 1, sy: 1, ox: 0, oy: 0 }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
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

export function TopologyGraph({
  nodes,
  edges,
  activeGroup,
  highlightMode = 'hover',
  onNodeClick,
  groupColors,
  width = 600,
  height = 460,
}: TopologyGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  const nodesRef = useRef(nodes)
  const edgesRef = useRef(edges)
  const activeGroupRef = useRef(activeGroup)

  nodesRef.current = nodes
  edgesRef.current = edges
  activeGroupRef.current = activeGroup

  const transform = useMemo(() => computeTransform(nodes, width, height, 52), [nodes, width, height])
  const transformRef = useRef(transform)
  transformRef.current = transform

  const tx = useCallback((x: number) => x * transformRef.current.sx + transformRef.current.ox, [])
  const ty = useCallback((y: number) => y * transformRef.current.sy + transformRef.current.oy, [])

  const getNodeColor = useCallback(
    (node: TopologyNode) => {
      if (groupColors && node.group && groupColors[node.group]) {
        return groupColors[node.group]
      }
      return DEFAULT_COLORS[node.type]
    },
    [groupColors]
  )

  const isHighlighted = useCallback(
    (node: TopologyNode) => {
      if (!activeGroupRef.current) return true
      if (node.type === 'core') return true
      return node.group === activeGroupRef.current
    },
    []
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
      ctx.clearRect(0, 0, width, height)

      const nodeMap = new Map(nodesRef.current.map((n) => [n.id, n]))

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
          ? 'rgba(148, 163, 184, 0.35)'
          : 'rgba(148, 163, 184, 0.08)'
        ctx.stroke()
        ctx.setLineDash([])
      }

      // Draw nodes
      for (const node of nodesRef.current) {
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
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)')
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
              ? 'bold 12px "DM Sans", sans-serif'
              : node.type === 'primary'
                ? '11px "DM Sans", sans-serif'
                : '9px "DM Sans", sans-serif'
          ctx.textAlign = 'center'
          ctx.fillStyle = hl
            ? 'rgba(226, 232, 240, 0.85)'
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
  }, [width, height, getNodeColor, isHighlighted, tx, ty])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onNodeClick || highlightMode !== 'click') return
    const rect = canvasRef.current!.getBoundingClientRect()
    const scaleX = width / rect.width
    const scaleY = height / rect.height
    const mx = (e.clientX - rect.left) * scaleX
    const my = (e.clientY - rect.top) * scaleY

    for (const node of nodesRef.current) {
      if (node.type === 'decorative') continue
      const r = NODE_SIZES[node.type] + 10
      const dx = tx(node.x) - mx
      const dy = ty(node.y) - my
      if (dx * dx + dy * dy < r * r) {
        onNodeClick(node)
        return
      }
    }
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        width,
        height,
        cursor: highlightMode === 'click' ? 'pointer' : 'default',
      }}
      onClick={handleClick}
    />
  )
}
