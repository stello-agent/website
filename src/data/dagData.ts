// DAG 节点和边的静态数据，用于 Screen 2 演示
export interface DagNode {
  id: string
  label: string
  x: number
  y: number
  r: number
  color: string
}

export interface DagEdge {
  from: string
  to: string
}

export const DAG_NODES: DagNode[] = [
  { id: 'main', label: 'Main', x: 380, y: 80, r: 34, color: '#4488ff' },
  { id: 'market', label: 'Market\nAnalysis', x: 180, y: 220, r: 28, color: '#cc88ff' },
  { id: 'tech', label: 'Tech\nStack', x: 380, y: 220, r: 28, color: '#cc88ff' },
  { id: 'ux', label: 'UX\nResearch', x: 580, y: 220, r: 28, color: '#cc88ff' },
  { id: 'compete', label: 'Competitor', x: 100, y: 360, r: 22, color: '#22ccbb' },
  { id: 'pricing', label: 'Pricing', x: 260, y: 360, r: 22, color: '#22ccbb' },
  { id: 'arch', label: 'Architecture', x: 420, y: 360, r: 22, color: '#22ccbb' },
  { id: 'user', label: 'User\nInterviews', x: 580, y: 360, r: 22, color: '#22ccbb' },
]

export const DAG_EDGES: DagEdge[] = [
  { from: 'main', to: 'market' },
  { from: 'main', to: 'tech' },
  { from: 'main', to: 'ux' },
  { from: 'market', to: 'compete' },
  { from: 'market', to: 'pricing' },
  { from: 'tech', to: 'arch' },
  { from: 'ux', to: 'user' },
]
