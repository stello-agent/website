// src/data/memoryTopoData.ts
// Topology data for the Memory section — visualizes 3-layer memory hierarchy
import type { TopologyNode, TopologyEdge } from '../components/TopologyGraph'

export const MEMORY_GROUP_COLORS: Record<string, string> = {
  l1: '#4488ff',
  l2: '#cc88ff',
  l3: '#22ccbb',
}

export const memoryNodes: TopologyNode[] = [
  // L1 — Global cognition (core)
  { id: 'l1', label: '全局认知', x: 250, y: 50, type: 'core', group: 'l1' },
  // L2 — Session summaries (primary)
  { id: 'l2-1', label: 'Session A 摘要', x: 100, y: 180, type: 'primary', group: 'l2' },
  { id: 'l2-2', label: 'Session B 摘要', x: 250, y: 200, type: 'primary', group: 'l2' },
  { id: 'l2-3', label: 'Session C 摘要', x: 400, y: 180, type: 'primary', group: 'l2' },
  // L3 — Raw records (child)
  { id: 'l3-1', label: '对话 #1', x: 50, y: 320, type: 'child', group: 'l3' },
  { id: 'l3-2', label: '对话 #2', x: 160, y: 340, type: 'child', group: 'l3' },
  { id: 'l3-3', label: '对话 #3', x: 270, y: 350, type: 'child', group: 'l3' },
  { id: 'l3-4', label: '对话 #4', x: 370, y: 340, type: 'child', group: 'l3' },
  { id: 'l3-5', label: '对话 #5', x: 460, y: 320, type: 'child', group: 'l3' },
  // Decorative
  { id: 'flow', label: '记忆流', x: 480, y: 60, type: 'decorative' },
  { id: 'synthesis', label: '综合', x: 30, y: 80, type: 'decorative' },
]

export const memoryEdges: TopologyEdge[] = [
  // L1 → L2 (solid)
  { from: 'l1', to: 'l2-1', style: 'solid' },
  { from: 'l1', to: 'l2-2', style: 'solid' },
  { from: 'l1', to: 'l2-3', style: 'solid' },
  // L2 → L3 (solid)
  { from: 'l2-1', to: 'l3-1', style: 'solid' },
  { from: 'l2-1', to: 'l3-2', style: 'solid' },
  { from: 'l2-2', to: 'l3-3', style: 'solid' },
  { from: 'l2-3', to: 'l3-4', style: 'solid' },
  { from: 'l2-3', to: 'l3-5', style: 'solid' },
  // L2 inter-links (dashed)
  { from: 'l2-1', to: 'l2-2', style: 'dashed' },
  { from: 'l2-2', to: 'l2-3', style: 'dashed' },
  // Decorative
  { from: 'flow', to: 'l2-3', style: 'thin-dashed' },
  { from: 'synthesis', to: 'l2-1', style: 'thin-dashed' },
]

// Map card index (0=L3, 1=L2, 2=L1) to topology group
export const CARD_INDEX_TO_GROUP = ['l3', 'l2', 'l1'] as const
export const GROUP_TO_CARD_INDEX: Record<string, number> = { l3: 0, l2: 1, l1: 2 }
