export const heroSlogans = [
  '把对话，变成认知拓扑网络',
  '用 AI Native 的方式认识世界',
  '你的思维正在发散成长！别让线性对话限制了它！',
  '多分支并行探索，全局意识自动整合',
]

export interface HeroCard {
  id: string
  title: string
  content: string
  highlight: string
  group: 'problem' | 'what' | 'build'
}

export const heroCards: HeroCard[] = [
  {
    id: 'problem',
    title: '线性对话正在拖垮你和 AI',
    content:
      '你是否会碰到：话题越聊越岔，硬塞一个窗口里互相污染。关掉页面什么都没留下，几天后想继续完全想不起来。',
    highlight: '你需要的不是更强的模型，而是更好的协作方式。',
    group: 'problem',
  },
  {
    id: 'what',
    title: '首个 Agent 认知拓扑引擎',
    content:
      '话题分叉时自动拆出独立分支，每个方向独立深入互不干扰。三层记忆帮你记住一切，全局意识层帮你发现分支之间的矛盾。',
    highlight: '关掉页面，结构还在。',
    group: 'what',
  },
  {
    id: 'build',
    title: '构建下一代 Agent 应用',
    content:
      '给你的 Agent 加上分支对话、分级记忆和跨分支洞察。Session 管分支，Skill 管能力，Tool 管执行。',
    highlight: '从单 Session 到完整拓扑，渐进式接入。',
    group: 'build',
  },
]

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

export const heroNodes: TopologyNode[] = [
  // Core
  { id: 'stello', label: 'Stello', x: 300, y: 200, type: 'core' },
  // Problem group (gray)
  { id: 'linear', label: '线性对话', x: 480, y: 80, type: 'primary', group: 'problem' },
  { id: 'context-loss', label: '上下文丢失', x: 520, y: 200, type: 'primary', group: 'problem' },
  { id: 'forget', label: '结构遗忘', x: 470, y: 320, type: 'primary', group: 'problem' },
  // What group (green)
  { id: 'session-topo', label: 'Session 拓扑', x: 130, y: 70, type: 'primary', group: 'what' },
  { id: 'memory-3', label: '三层记忆', x: 80, y: 200, type: 'primary', group: 'what' },
  { id: 'global-aware', label: '全局意识', x: 130, y: 330, type: 'primary', group: 'what' },
  // Build group (purple)
  { id: 'skill', label: 'Skill 协议', x: 200, y: 400, type: 'primary', group: 'build' },
  { id: 'tool-call', label: 'Tool 调用', x: 340, y: 400, type: 'primary', group: 'build' },
  { id: 'agent-build', label: 'Agent 构建', x: 420, y: 400, type: 'primary', group: 'build' },
  // Decorative
  { id: 'd-branch', label: '分支', x: 560, y: 130, type: 'decorative' },
  { id: 'd-insight', label: '洞察', x: 40, y: 120, type: 'decorative' },
  { id: 'd-network', label: '认知网络', x: 30, y: 310, type: 'decorative' },
  { id: 'd-diverge', label: '思维发散', x: 560, y: 370, type: 'decorative' },
  { id: 'd-starmap', label: '星空图', x: 200, y: 10, type: 'decorative' },
  { id: 'd-flow', label: '记忆流动', x: 450, y: 10, type: 'decorative' },
]

export const heroEdges: TopologyEdge[] = [
  // Core -> primary
  { from: 'stello', to: 'linear', style: 'solid' },
  { from: 'stello', to: 'context-loss', style: 'solid' },
  { from: 'stello', to: 'forget', style: 'solid' },
  { from: 'stello', to: 'session-topo', style: 'solid' },
  { from: 'stello', to: 'memory-3', style: 'solid' },
  { from: 'stello', to: 'global-aware', style: 'solid' },
  { from: 'stello', to: 'skill', style: 'solid' },
  { from: 'stello', to: 'tool-call', style: 'solid' },
  { from: 'stello', to: 'agent-build', style: 'solid' },
  // Intra-group
  { from: 'linear', to: 'context-loss', style: 'dashed' },
  { from: 'context-loss', to: 'forget', style: 'dashed' },
  { from: 'session-topo', to: 'memory-3', style: 'dashed' },
  { from: 'memory-3', to: 'global-aware', style: 'dashed' },
  { from: 'skill', to: 'tool-call', style: 'dashed' },
  { from: 'tool-call', to: 'agent-build', style: 'dashed' },
  // Decorative
  { from: 'd-branch', to: 'linear', style: 'thin-dashed' },
  { from: 'd-insight', to: 'session-topo', style: 'thin-dashed' },
  { from: 'd-network', to: 'global-aware', style: 'thin-dashed' },
  { from: 'd-diverge', to: 'forget', style: 'thin-dashed' },
  { from: 'd-starmap', to: 'session-topo', style: 'thin-dashed' },
  { from: 'd-flow', to: 'linear', style: 'thin-dashed' },
]
