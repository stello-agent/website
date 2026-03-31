// src/data/sectionTopoData.ts
// Hand-crafted topology data for BrainstormSection (Screen 3) and UseCasesSection (Screen 4)
import type { TopologyNode, TopologyEdge } from '../components/TopologyGraph'

/* ── Screen 3: 产品头脑风暴 ─────────────────── */
// Root "产品规划" at center, 3 branches radiating out organically

const brainstormNodesZh: TopologyNode[] = [
  // Core — center
  { id: 'main', label: '产品规划', x: 280, y: 210, type: 'core' },
  // Branch 1: 市场 (upper-left)
  { id: 'market', label: '市场分析', x: 120, y: 120, type: 'primary', group: 'market' },
  { id: 'competitor', label: '竞品调研', x: 30, y: 40, type: 'child', group: 'market' },
  { id: 'persona', label: '用户画像', x: 180, y: 30, type: 'child', group: 'market' },
  // Branch 2: 功能 (lower-left)
  { id: 'feature', label: '功能规划', x: 150, y: 340, type: 'primary', group: 'feature' },
  { id: 'core', label: '核心功能', x: 30, y: 390, type: 'child', group: 'feature' },
  { id: 'growth', label: '增长策略', x: 100, y: 430, type: 'child', group: 'feature' },
  { id: 'ux', label: '交互设计', x: 250, y: 420, type: 'child', group: 'feature' },
  // Branch 3: 技术 (right)
  { id: 'tech', label: '技术选型', x: 460, y: 180, type: 'primary', group: 'tech' },
  { id: 'infra', label: '基础架构', x: 530, y: 90, type: 'child', group: 'tech' },
  { id: 'ai', label: 'AI 集成', x: 540, y: 280, type: 'child', group: 'tech' },
]

const brainstormNodesEn: TopologyNode[] = [
  { id: 'main', label: 'Product', x: 280, y: 210, type: 'core' },
  { id: 'market', label: 'Market', x: 120, y: 120, type: 'primary', group: 'market' },
  { id: 'competitor', label: 'Competitors', x: 30, y: 40, type: 'child', group: 'market' },
  { id: 'persona', label: 'Personas', x: 180, y: 30, type: 'child', group: 'market' },
  { id: 'feature', label: 'Features', x: 150, y: 340, type: 'primary', group: 'feature' },
  { id: 'core', label: 'Core', x: 30, y: 390, type: 'child', group: 'feature' },
  { id: 'growth', label: 'Growth', x: 100, y: 430, type: 'child', group: 'feature' },
  { id: 'ux', label: 'UX Design', x: 250, y: 420, type: 'child', group: 'feature' },
  { id: 'tech', label: 'Tech Stack', x: 460, y: 180, type: 'primary', group: 'tech' },
  { id: 'infra', label: 'Infra', x: 530, y: 90, type: 'child', group: 'tech' },
  { id: 'ai', label: 'AI Layer', x: 540, y: 280, type: 'child', group: 'tech' },
]

const brainstormEdges: TopologyEdge[] = [
  // Core → branches
  { from: 'main', to: 'market', style: 'solid' },
  { from: 'main', to: 'feature', style: 'solid' },
  { from: 'main', to: 'tech', style: 'solid' },
  // Market children
  { from: 'market', to: 'competitor', style: 'solid' },
  { from: 'market', to: 'persona', style: 'solid' },
  // Feature children
  { from: 'feature', to: 'core', style: 'solid' },
  { from: 'feature', to: 'growth', style: 'solid' },
  { from: 'feature', to: 'ux', style: 'solid' },
  // Tech children
  { from: 'tech', to: 'infra', style: 'solid' },
  { from: 'tech', to: 'ai', style: 'solid' },
  // Cross-refs
  { from: 'persona', to: 'feature', style: 'dashed' },
  { from: 'growth', to: 'market', style: 'dashed' },
]

/* ── Screen 4: 应用场景 ─────────────────────── */
// Root "咨询助手" at center, 3 domains spreading outward

const useCasesNodesZh: TopologyNode[] = [
  // Core — slightly right of center for balance
  { id: 'main', label: '咨询助手', x: 300, y: 220, type: 'core' },
  // Branch 1: 留学 (upper-right)
  { id: 'abroad', label: '留学规划', x: 480, y: 100, type: 'primary', group: 'abroad' },
  { id: 'us', label: '美国申请', x: 530, y: 210, type: 'child', group: 'abroad' },
  { id: 'uk', label: '英国申请', x: 560, y: 30, type: 'child', group: 'abroad' },
  // Branch 2: 考研 (lower)
  { id: 'grad', label: '考研辅导', x: 240, y: 370, type: 'primary', group: 'grad' },
  { id: 'math', label: '数学专项', x: 100, y: 430, type: 'child', group: 'grad' },
  { id: 'politics', label: '政治理论', x: 260, y: 460, type: 'child', group: 'grad' },
  { id: 'english', label: '英语提升', x: 400, y: 430, type: 'child', group: 'grad' },
  // Branch 3: 考公 (upper-left)
  { id: 'civil', label: '考公备考', x: 110, y: 130, type: 'primary', group: 'civil' },
  { id: 'written', label: '笔试策略', x: 20, y: 50, type: 'child', group: 'civil' },
  { id: 'interview', label: '面试准备', x: 30, y: 240, type: 'child', group: 'civil' },
]

const useCasesNodesEn: TopologyNode[] = [
  { id: 'main', label: 'AI Advisor', x: 300, y: 220, type: 'core' },
  { id: 'abroad', label: 'Study Abroad', x: 480, y: 100, type: 'primary', group: 'abroad' },
  { id: 'us', label: 'US Apply', x: 530, y: 210, type: 'child', group: 'abroad' },
  { id: 'uk', label: 'UK Apply', x: 560, y: 30, type: 'child', group: 'abroad' },
  { id: 'grad', label: 'Grad Exam', x: 240, y: 370, type: 'primary', group: 'grad' },
  { id: 'math', label: 'Mathematics', x: 100, y: 430, type: 'child', group: 'grad' },
  { id: 'politics', label: 'Politics', x: 260, y: 460, type: 'child', group: 'grad' },
  { id: 'english', label: 'English', x: 400, y: 430, type: 'child', group: 'grad' },
  { id: 'civil', label: 'Civil Service', x: 110, y: 130, type: 'primary', group: 'civil' },
  { id: 'written', label: 'Written', x: 20, y: 50, type: 'child', group: 'civil' },
  { id: 'interview', label: 'Interview', x: 30, y: 240, type: 'child', group: 'civil' },
]

const useCasesEdges: TopologyEdge[] = [
  // Core → branches
  { from: 'main', to: 'abroad', style: 'solid' },
  { from: 'main', to: 'grad', style: 'solid' },
  { from: 'main', to: 'civil', style: 'solid' },
  // Abroad children
  { from: 'abroad', to: 'us', style: 'solid' },
  { from: 'abroad', to: 'uk', style: 'solid' },
  // Grad children
  { from: 'grad', to: 'math', style: 'solid' },
  { from: 'grad', to: 'politics', style: 'solid' },
  { from: 'grad', to: 'english', style: 'solid' },
  // Civil children
  { from: 'civil', to: 'written', style: 'solid' },
  { from: 'civil', to: 'interview', style: 'solid' },
  // Cross-refs
  { from: 'us', to: 'grad', style: 'dashed' },
  { from: 'interview', to: 'abroad', style: 'dashed' },
]

/* ── Exports ─────────────────────────────────── */

export function getBrainstormTopo(lang: 'en' | 'zh') {
  return {
    nodes: lang === 'zh' ? brainstormNodesZh : brainstormNodesEn,
    edges: brainstormEdges,
  }
}

export function getUseCasesTopo(lang: 'en' | 'zh') {
  return {
    nodes: lang === 'zh' ? useCasesNodesZh : useCasesNodesEn,
    edges: useCasesEdges,
  }
}
