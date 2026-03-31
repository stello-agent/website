// src/components/TopologyDemo.tsx
// 移植自 stello/packages/devtools/web/src/pages/Topology.tsx
// 简化为纯静态 demo：无 API、无右键菜单、无面板，保留 Canvas 渲染 + pan/zoom + hover
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Theme } from '../context/ThemeContext'
import { useThemeContext } from '../context/ThemeContext'

/* ── 类型 ─────────────────────────────────────────── */

interface CanvasTheme {
  bgCenter: string
  bgEdge: string
  lineColor: string
  lineHighlight: string
  lineDim: string
  refColor: string
  refHighlight: string
  refDim: string
  labelAlpha: number
}

const canvasThemes: Record<Theme, CanvasTheme> = {
  light: {
    bgCenter: '#f5f7fc',
    bgEdge: '#eaecf5',
    lineColor: 'rgba(34,102,238,0.18)',
    lineHighlight: 'rgba(34,102,238,0.60)',
    lineDim: 'rgba(34,102,238,0.05)',
    refColor: 'rgba(136,68,221,0.18)',
    refHighlight: 'rgba(136,68,221,0.60)',
    refDim: 'rgba(136,68,221,0.05)',
    labelAlpha: 0.85,
  },
  dark: {
    bgCenter: '#0c1228',
    bgEdge: '#06080f',
    lineColor: 'rgba(68,136,255,0.38)',
    lineHighlight: 'rgba(68,136,255,0.80)',
    lineDim: 'rgba(68,136,255,0.10)',
    refColor: 'rgba(204,136,255,0.38)',
    refHighlight: 'rgba(204,136,255,0.80)',
    refDim: 'rgba(204,136,255,0.10)',
    labelAlpha: 0.75,
  },
}

interface TopoNode {
  id: string
  label: string
  parentId: string | null
  sourceSessionId?: string
  status: 'active' | 'archived'
  turns: number
  children: string[]
  refs: string[]
}

interface LayoutNode extends TopoNode {
  x: number
  y: number
  size: number
  color: string
  glowColor: string
  brightness: number
}

/* ── 静态 demo 数据 ────────────────────────────────── */

const DEMO_NODES: TopoNode[] = [
  {
    id: 'main',
    label: 'main',
    parentId: null,
    status: 'active',
    turns: 28,
    children: ['research', 'codegen', 'planning'],
    refs: [],
  },
  {
    id: 'research',
    label: 'research',
    parentId: 'main',
    status: 'active',
    turns: 11,
    children: ['search', 'analysis'],
    refs: [],
  },
  {
    id: 'search',
    label: 'web-search',
    parentId: 'research',
    status: 'active',
    turns: 4,
    children: [],
    refs: [],
  },
  {
    id: 'analysis',
    label: 'analysis',
    parentId: 'research',
    status: 'archived',
    turns: 6,
    children: [],
    refs: ['codegen'],
  },
  {
    id: 'codegen',
    label: 'code-gen',
    parentId: 'main',
    status: 'active',
    turns: 15,
    children: ['backend', 'frontend'],
    refs: [],
  },
  {
    id: 'backend',
    label: 'backend',
    parentId: 'codegen',
    status: 'active',
    turns: 9,
    children: ['api'],
    refs: [],
  },
  {
    id: 'api',
    label: 'api-design',
    parentId: 'backend',
    status: 'active',
    turns: 5,
    children: [],
    refs: [],
  },
  {
    id: 'frontend',
    label: 'frontend',
    parentId: 'codegen',
    status: 'active',
    turns: 7,
    children: [],
    refs: [],
  },
  {
    id: 'planning',
    label: 'planning',
    parentId: 'main',
    status: 'active',
    turns: 8,
    children: ['sprint-1', 'sprint-2'],
    refs: [],
  },
  {
    id: 'sprint-1',
    label: 'sprint-1',
    parentId: 'planning',
    status: 'archived',
    turns: 12,
    children: [],
    refs: [],
  },
  {
    id: 'sprint-2',
    label: 'sprint-2',
    parentId: 'planning',
    status: 'active',
    turns: 6,
    children: [],
    refs: ['backend'],
  },
]

/* ── 颜色函数（网站调色板） ──────────────────────────── */

function getNodeStyle(
  node: TopoNode,
  isMain: boolean,
  theme: Theme,
): { color: string; glowColor: string } {
  if (theme === 'dark') {
    if (isMain) return { color: '#4488ff', glowColor: 'rgba(68,136,255,0.55)' }
    if (node.status === 'archived')
      return { color: '#445566', glowColor: 'rgba(68,85,102,0.25)' }
    if (node.children.length === 0)
      return { color: '#22ccbb', glowColor: 'rgba(34,204,187,0.35)' }
    return { color: '#cc88ff', glowColor: 'rgba(204,136,255,0.40)' }
  } else {
    if (isMain) return { color: '#2266ee', glowColor: 'rgba(34,102,238,0.35)' }
    if (node.status === 'archived')
      return { color: '#8899b0', glowColor: 'rgba(136,153,176,0.20)' }
    if (node.children.length === 0)
      return { color: '#109980', glowColor: 'rgba(16,153,128,0.25)' }
    return { color: '#8844dd', glowColor: 'rgba(136,68,221,0.30)' }
  }
}

/* ── 布局算法（同心环，从 devtools 原样移植） ──────────── */

function computeLayout(
  nodes: TopoNode[],
  width: number,
  height: number,
  theme: Theme,
): LayoutNode[] {
  const cx = width * 0.42
  const cy = height / 2
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const result: LayoutNode[] = []

  const root = nodes.find((n) => n.parentId === null)
  if (!root) return result

  // BFS 分层
  const layers: TopoNode[][] = [[root]]
  const visited = new Set([root.id])
  let current = [root]

  while (current.length > 0) {
    const next: TopoNode[] = []
    for (const node of current) {
      for (const childId of node.children) {
        const child = nodeMap.get(childId)
        if (child && !visited.has(child.id)) {
          visited.add(child.id)
          next.push(child)
        }
      }
    }
    if (next.length > 0) layers.push(next)
    current = next
  }

  const ringSpacing = Math.min(width, height) * 0.2
  const maxTurns = Math.max(...nodes.map((n) => n.turns), 1)

  for (let layer = 0; layer < layers.length; layer++) {
    const ring = layers[layer]!
    const radius = layer === 0 ? 0 : ringSpacing * layer

    for (let i = 0; i < ring.length; i++) {
      const node = ring[i]!
      const isMain = node.parentId === null
      const angle =
        ring.length === 1 ? 0 : (2 * Math.PI * i) / ring.length - Math.PI / 2

      const jitterX =
        layer === 0 ? 0 : Math.sin(i * 7.3 + layer * 2.1) * ringSpacing * 0.15
      const jitterY =
        layer === 0 ? 0 : Math.cos(i * 5.7 + layer * 3.4) * ringSpacing * 0.15

      const x = cx + Math.cos(angle) * radius + jitterX
      const y = cy + Math.sin(angle) * radius + jitterY

      const sizeBase = isMain ? 18 : 6
      const sizeScale = (node.turns / maxTurns) * 10
      const size = sizeBase + sizeScale

      const { color, glowColor } = getNodeStyle(node, isMain, theme)
      const brightness =
        node.status === 'archived' ? 0.5 : 0.8 + (node.turns / maxTurns) * 0.2

      result.push({ ...node, x, y, size, color, glowColor, brightness })
    }
  }

  return result
}

/* ── 辅助函数 ─────────────────────────────────────── */

function getDisplayParentId(
  node: Pick<TopoNode, 'id' | 'parentId' | 'sourceSessionId'>,
): string | null {
  if (node.sourceSessionId && node.sourceSessionId !== node.id)
    return node.sourceSessionId
  return node.parentId
}

function isAdjacent(
  node: LayoutNode,
  highlightedId: string | null,
  nodeMap: Map<string, LayoutNode>,
): boolean {
  if (!highlightedId) return false
  if (node.id === highlightedId) return true
  if (getDisplayParentId(node) === highlightedId) return true
  const highlighted = nodeMap.get(highlightedId)
  if (highlighted && getDisplayParentId(highlighted) === node.id) return true
  if (node.refs.includes(highlightedId)) return true
  if (highlighted?.refs.includes(node.id)) return true
  return false
}

/* ── 渲染函数（从 devtools 原样移植，调色板已替换） ──── */

function renderFrame(
  ctx: CanvasRenderingContext2D,
  nodes: LayoutNode[],
  width: number,
  height: number,
  highlightedId: string | null,
  time: number,
  ct: CanvasTheme,
) {
  const margin = 2000
  const grad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    0,
    width / 2,
    height / 2,
    width,
  )
  grad.addColorStop(0, ct.bgCenter)
  grad.addColorStop(1, ct.bgEdge)
  ctx.fillStyle = grad
  ctx.fillRect(-margin, -margin, width + margin * 2, height + margin * 2)

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const hasHighlight = highlightedId !== null

  // 父子连线
  for (const node of nodes) {
    const parentId = getDisplayParentId(node)
    if (!parentId) continue
    const parent = nodeMap.get(parentId)
    if (!parent) continue

    const adj =
      hasHighlight &&
      isAdjacent(node, highlightedId, nodeMap) &&
      isAdjacent(parent, highlightedId, nodeMap)
    ctx.beginPath()
    ctx.moveTo(parent.x, parent.y)
    ctx.lineTo(node.x, node.y)
    ctx.strokeStyle = adj
      ? ct.lineHighlight
      : hasHighlight
        ? ct.lineDim
        : ct.lineColor
    ctx.lineWidth = adj ? 3 : getDisplayParentId(parent) === null ? 2.5 : 1.5
    ctx.shadowColor = adj ? ct.lineColor : ct.lineDim
    ctx.shadowBlur = adj ? 12 : 8
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  // 跨分支虚线引用
  for (const node of nodes) {
    for (const refId of node.refs) {
      const ref = nodeMap.get(refId)
      if (!ref) continue
      const adj =
        hasHighlight &&
        isAdjacent(node, highlightedId, nodeMap) &&
        isAdjacent(ref, highlightedId, nodeMap)
      ctx.beginPath()
      ctx.moveTo(node.x, node.y)
      ctx.lineTo(ref.x, ref.y)
      ctx.strokeStyle = adj
        ? ct.refHighlight
        : hasHighlight
          ? ct.refDim
          : ct.refColor
      ctx.lineWidth = adj ? 2 : 1.5
      ctx.setLineDash([6, 4])
      ctx.shadowColor = ct.refDim
      ctx.shadowBlur = adj ? 10 : 6
      ctx.stroke()
      ctx.setLineDash([])
      ctx.shadowBlur = 0
    }
  }

  // 节点
  for (const node of nodes) {
    const isHighlighted = node.id === highlightedId
    const adjacent = isAdjacent(node, highlightedId, nodeMap)
    const dimmed = hasHighlight && !adjacent

    const pulse =
      Math.sin(time * 0.002 + node.x * 0.01 + node.y * 0.01) * 0.15 + 1
    const animatedSize = Math.max(1, node.size * (isHighlighted ? 1.2 : pulse))

    ctx.beginPath()
    ctx.arc(node.x, node.y, animatedSize, 0, Math.PI * 2)
    ctx.fillStyle = node.color
    ctx.globalAlpha = dimmed ? 0.25 : node.brightness
    ctx.shadowColor = node.glowColor
    ctx.shadowBlur = isHighlighted ? 35 : dimmed ? 4 : node.size + 8
    ctx.fill()
    ctx.shadowBlur = 0

    if (isHighlighted) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, animatedSize + 4, 0, Math.PI * 2)
      ctx.strokeStyle = node.color
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 0.4 + Math.sin(time * 0.005) * 0.2
      ctx.stroke()
    }

    ctx.globalAlpha = 1

    const isMain = getDisplayParentId(node) === null
    ctx.font = `${isMain ? '600' : '500'} ${isMain ? 11 : 9}px Inter, system-ui`
    ctx.fillStyle = node.color
    ctx.globalAlpha = dimmed
      ? 0.2
      : node.status === 'archived'
        ? 0.5
        : ct.labelAlpha
    ctx.textAlign = 'left'
    ctx.fillText(node.label, node.x + animatedSize + 6, node.y + 4)
    ctx.globalAlpha = 1
  }
}

/* ── TopologyDemo 组件（无拖拽/平移/缩放，固定位置） ── */

interface TopologyDemoProps {
  nodes?: TopoNode[]
}

export function TopologyDemo({ nodes: externalNodes }: TopologyDemoProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<LayoutNode[]>([])
  const [size, setSize] = useState({ width: 600, height: 400 })
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const { theme } = useThemeContext()
  const activeNodes = externalNodes ?? DEMO_NODES

  const highlightedRef = useRef<string | null>(null)
  const themeRef = useRef(theme)

  useEffect(() => {
    highlightedRef.current = highlighted
  }, [highlighted])
  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  // 布局计算：节点居中在画布上
  useEffect(() => {
    nodesRef.current = computeLayout(
      activeNodes,
      size.width,
      size.height,
      theme,
    )
  }, [activeNodes, size, theme])

  // ResizeObserver
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setSize({ width, height })
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // rAF 动画循环（固定视角，只做动画和 hover 渲染）
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = size.width * dpr
    canvas.height = size.height * dpr

    let rafId: number
    const loop = (time: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      renderFrame(
        ctx,
        nodesRef.current,
        size.width,
        size.height,
        highlightedRef.current,
        time,
        canvasThemes[themeRef.current],
      )
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [size])

  // hover 检测（屏幕坐标直接等于世界坐标，无 camera 偏移）
  const hitTest = useCallback(
    (screenX: number, screenY: number): LayoutNode | null => {
      return (
        nodesRef.current.find((n) => {
          const dx = n.x - screenX
          const dy = n.y - screenY
          return dx * dx + dy * dy <= (n.size + 6) * (n.size + 6)
        }) ?? null
      )
    },
    [],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const scaleX = size.width / rect.width
      const scaleY = size.height / rect.height
      const hit = hitTest(
        (e.clientX - rect.left) * scaleX,
        (e.clientY - rect.top) * scaleY,
      )
      setHighlighted(hit?.id ?? null)
      canvas.style.cursor = hit ? 'pointer' : 'default'
    },
    [hitTest, size],
  )

  const handleMouseLeave = useCallback(() => {
    setHighlighted(null)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 'inherit',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  )
}
