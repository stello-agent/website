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

// DagCanvas — Coze 风格可拖拽节点图
// nodeType: 'center' → 发光圆圈; 'branch' → 彩色粗文字; 'leaf' → 小灰文字; undefined → leaf
export function DagCanvas({ nodes, edges }: Props) {
  const [positions, setPositions] = useState<Positions>(() =>
    Object.fromEntries(nodes.map((n) => [n.id, { x: n.x, y: n.y }]))
  )
  const dragging = useRef<{ id: string; ox: number; oy: number } | null>(null)

  const onPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    const pos = positions[id]
    dragging.current = { id, ox: e.clientX - pos.x, oy: e.clientY - pos.y }
  }, [positions])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    const { id, ox, oy } = dragging.current
    setPositions((prev) => ({ ...prev, [id]: { x: e.clientX - ox, y: e.clientY - oy } }))
  }, [])

  const onPointerUp = useCallback(() => { dragging.current = null }, [])

  const getNode = (id: string) => nodes.find((n) => n.id === id)

  return (
    <svg
      className="dag-canvas"
      viewBox="0 0 760 480"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <defs>
        <filter id="center-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="branch-glow" x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges — thin, subtle */}
      {edges.map((edge) => {
        const fromNode = getNode(edge.from)
        const toNode = getNode(edge.to)
        if (!fromNode || !toNode) return null
        const fp = positions[edge.from]
        const tp = positions[edge.to]
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={fp.x} y1={fp.y}
            x2={tp.x} y2={tp.y}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={1}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const pos = positions[node.id]
        const type = node.nodeType ?? 'leaf'
        const lines = node.label.split('\n')

        if (type === 'center') {
          return (
            <g
              key={node.id}
              transform={`translate(${pos.x},${pos.y})`}
              onPointerDown={(e) => onPointerDown(e, node.id)}
              style={{ cursor: 'grab' }}
            >
              {/* Outer glow ring */}
              <circle r={node.r + 10} fill={`${node.color}08`} stroke={`${node.color}20`} strokeWidth={1} />
              {/* Main circle */}
              <circle r={node.r} fill={`${node.color}18`} stroke={node.color} strokeWidth={1.5} filter="url(#center-glow)" />
              {/* Label */}
              {lines.map((line, i) => (
                <text
                  key={i}
                  textAnchor="middle"
                  dy={lines.length === 1 ? '0.35em' : i === 0 ? '-0.15em' : '1em'}
                  fill={node.color}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="inherit"
                  letterSpacing="-0.02em"
                >
                  {line}
                </text>
              ))}
            </g>
          )
        }

        if (type === 'branch') {
          return (
            <g
              key={node.id}
              transform={`translate(${pos.x},${pos.y})`}
              onPointerDown={(e) => onPointerDown(e, node.id)}
              style={{ cursor: 'grab' }}
            >
              {/* Invisible hitbox circle — required for tests */}
              <circle r={node.r} fill="transparent" stroke="transparent" />
              {/* Text label with glow */}
              <text
                textAnchor="middle"
                dy="0.35em"
                fill={node.color}
                fontSize="13"
                fontWeight="700"
                fontFamily="inherit"
                letterSpacing="-0.01em"
                filter="url(#branch-glow)"
              >
                {node.label}
              </text>
            </g>
          )
        }

        // leaf
        return (
          <g
            key={node.id}
            transform={`translate(${pos.x},${pos.y})`}
            onPointerDown={(e) => onPointerDown(e, node.id)}
            style={{ cursor: 'grab' }}
          >
            {/* Invisible hitbox circle */}
            <circle r={node.r} fill="transparent" stroke="transparent" />
            <text
              textAnchor="middle"
              dy="0.35em"
              fill="rgba(232,240,255,0.38)"
              fontSize="11"
              fontWeight="400"
              fontFamily="inherit"
            >
              {node.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
