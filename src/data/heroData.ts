// src/data/heroData.ts
// Hero section data — cards, topology nodes/edges, slogans
import type { TopologyNode, TopologyEdge } from '../components/TopologyGraph'

export interface HeroCard {
  id: string
  title: { en: string; zh: string }
  content: { en: string; zh: string }
  highlight: { en: string; zh: string }
  group: 'problem' | 'what' | 'build'
}

export const GROUP_COLORS: Record<string, string> = {
  problem: '#9a8e80',
  what: '#7b9b8b',
  build: '#9b7b6b',
}

export const heroCards: HeroCard[] = [
  {
    id: 'problem',
    title: {
      en: 'Linear chat is dragging you and AI down',
      zh: '线性对话正在拖垮你和 AI',
    },
    content: {
      en: 'Ever had this happen? Topics diverge and pollute each other crammed into one window. Close the page and everything is gone — try to pick up days later and you can\'t remember a thing.',
      zh: '你是否会碰到：话题越聊越岔，硬塞一个窗口里互相污染。关掉页面什么都没留下，几天后想继续完全想不起来。',
    },
    highlight: {
      en: "You don't need a stronger model — you need a better way to collaborate.",
      zh: '你需要的不是更强的模型，而是更好的协作方式。',
    },
    group: 'problem',
  },
  {
    id: 'what',
    title: {
      en: 'The first Agent Cognitive Topology Engine',
      zh: '首个 Agent 认知拓扑引擎',
    },
    content: {
      en: 'When topics diverge, independent branches are automatically created — each direction goes deep without interference. Three-layer memory remembers everything. Global awareness detects cross-branch conflicts.',
      zh: '话题分叉时自动拆出独立分支，每个方向独立深入互不干扰。三层记忆帮你记住一切，全局意识层帮你发现分支之间的矛盾。',
    },
    highlight: {
      en: 'Close the page — the structure stays.',
      zh: '关掉页面，结构还在。',
    },
    group: 'what',
  },
  {
    id: 'build',
    title: {
      en: 'Build next-gen Agent applications',
      zh: '构建下一代 Agent 应用',
    },
    content: {
      en: 'Add branching conversations, layered memory and cross-branch insights to your Agent. Session manages branches, Skill manages capabilities, Tool manages execution.',
      zh: '给你的 Agent 加上分支对话、分级记忆和跨分支洞察。Session 管分支，Skill 管能力，Tool 管执行。',
    },
    highlight: {
      en: 'From a single Session to a full topology — incremental adoption.',
      zh: '从单 Session 到完整拓扑，渐进式接入。',
    },
    group: 'build',
  },
]

export const heroNodes: TopologyNode[] = [
  // Core — center
  { id: 'stello', label: 'Stello', x: 400, y: 320, type: 'core' },
  // Primary — 3 groups, generous spacing from core
  { id: 'problem', label: '困境', x: 130, y: 160, type: 'primary', group: 'problem' },
  { id: 'what', label: '是什么', x: 670, y: 160, type: 'primary', group: 'what' },
  { id: 'build', label: '能做什么', x: 400, y: 560, type: 'primary', group: 'build' },
  // Children — problem (fan out top-left)
  { id: 'context-loss', label: '上下文丢失', x: 30, y: 50, type: 'child', group: 'problem' },
  { id: 'linear', label: '线性对话', x: 220, y: 30, type: 'child', group: 'problem' },
  { id: 'forget', label: '结构遗忘', x: 20, y: 270, type: 'child', group: 'problem' },
  // Children — what (fan out top-right)
  { id: 'session-topo', label: 'Session 拓扑', x: 580, y: 30, type: 'child', group: 'what' },
  { id: 'memory-3', label: '三层记忆', x: 770, y: 50, type: 'child', group: 'what' },
  { id: 'global-aware', label: '全局意识', x: 780, y: 270, type: 'child', group: 'what' },
  // Children — build (fan out bottom)
  { id: 'skill', label: 'Skill 协议', x: 200, y: 620, type: 'child', group: 'build' },
  { id: 'tool-call', label: 'Tool 调用', x: 400, y: 660, type: 'child', group: 'build' },
  { id: 'agent-build', label: 'Agent 构建', x: 600, y: 620, type: 'child', group: 'build' },
]

export const heroEdges: TopologyEdge[] = [
  // Core → primary
  { from: 'stello', to: 'problem', style: 'solid' },
  { from: 'stello', to: 'what', style: 'solid' },
  { from: 'stello', to: 'build', style: 'solid' },
  // Primary → children
  { from: 'problem', to: 'context-loss', style: 'solid' },
  { from: 'problem', to: 'linear', style: 'solid' },
  { from: 'problem', to: 'forget', style: 'solid' },
  { from: 'what', to: 'session-topo', style: 'solid' },
  { from: 'what', to: 'memory-3', style: 'solid' },
  { from: 'what', to: 'global-aware', style: 'solid' },
  { from: 'build', to: 'skill', style: 'solid' },
  { from: 'build', to: 'tool-call', style: 'solid' },
  { from: 'build', to: 'agent-build', style: 'solid' },
]
