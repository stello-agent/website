// src/components/DagCanvas.tsx
import { useState, useCallback, useRef } from 'react'
import type { DagNode, DagEdge } from '../data/dagData'
import './DagCanvas.css'

interface Props {
  nodes: DagNode[]
  edges: DagEdge[]
}

interface Positions {
  [id: string]: { x: number; y: number }
}

// DagCanvas 渲染可拖拽 SVG 节点图
export function DagCanvas({ nodes, edges }: Props) {
  const [positions, setPositions] = useState<Positions>(() =>
    Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]))
  )
  const dragging = useRef<{ id: string; ox: number; oy: number } | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const onPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    const pos = positions[id]
    dragging.current = { id, ox: e.clientX - pos.x, oy: e.clientY - pos.y }
  }, [positions])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    const { id, ox, oy } = dragging.current
    setPositions((prev) => ({
      ...prev,
      [id]: { x: e.clientX - ox, y: e.clientY - oy },
    }))
  }, [])

  const onPointerUp = useCallback(() => {
    dragging.current = null
  }, [])

  const getNode = (id: string) => nodes.find((n) => n.id === id)

  return (
    <svg
      ref={svgRef}
      className="dag-canvas"
      viewBox="0 0 760 480"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <defs>
        <filter id="node-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map((edge) => {
        const fromNode = getNode(edge.from)
        const toNode = getNode(edge.to)
        if (!fromNode || !toNode) return null
        const fp = positions[edge.from]
        const tp = positions[edge.to]
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            className="dag-edge"
            x1={fp.x}
            y1={fp.y}
            x2={tp.x}
            y2={tp.y}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const pos = positions[node.id]
        const lines = node.label.split('\n')
        return (
          <g
            key={node.id}
            className="dag-node"
            transform={`translate(${pos.x},${pos.y})`}
            onPointerDown={(e) => onPointerDown(e, node.id)}
            style={{ cursor: 'grab' }}
          >
            <circle r={node.r} fill={`${node.color}22`} stroke={node.color} strokeWidth={1.5} filter="url(#node-glow)" />
            {lines.map((line, i) => (
              <text
                key={i}
                className="dag-label"
                textAnchor="middle"
                dy={lines.length === 1 ? '0.35em' : i === 0 ? '-0.1em' : '1em'}
                fill={node.color}
              >
                {line}
              </text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}
