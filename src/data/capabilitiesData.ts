// src/data/capabilitiesData.ts
// Ported from prototype — capabilities section with interactive topology + code tabs
import type { TopologyNode, TopologyEdge } from '../components/TopologyGraph'

export interface CapabilityTab {
  name: string
  language: string
  code: string
}

export interface CapabilityItem {
  id: string
  title: { en: string; zh: string }
  subtitle: { en: string; zh: string }
  description: { en: string; zh: string }
  tabs: CapabilityTab[]
}

export const capabilities: CapabilityItem[] = [
  {
    id: 'auto-split',
    title: { en: 'Auto Topic Branching', zh: '对话自动分裂' },
    subtitle: { en: 'Let thoughts branch freely', zh: '让思路自由分叉' },
    description: {
      en: 'When AI detects a fork in your thinking, it spawns a child Session via tool call. Each branch has clear scope boundaries.',
      zh: '当 AI 发现话题开始分叉，会自动通过工具调用创建子 Session。每个分支有明确的 scope 边界，互不干扰。',
    },
    tabs: [
      {
        name: 'scope.md',
        language: 'markdown',
        code: `# Session Scope

## 主题
竞品定价策略分析

## 边界
- 仅讨论 Acme、Vertex、Orbit 三家的定价模型
- 不涉及产品功能对比
- 产出：定价模型对比表 + 建议

## 创建来源
由主对话在讨论"产品策略"时自动分裂`,
      },
      {
        name: 'split-guard.ts',
        language: 'typescript',
        code: `const splitGuard = {
  maxDepth: 3,              // 最多 3 层嵌套
  maxChildren: 8,           // 单个 Session 最多 8 个子分支
  confirmMode: 'auto',      // 'auto' | 'ask' | 'deny'
  cooldown: 3,              // 同一 Session 3 轮内不再分裂
  scopeRequired: true,      // 必须生成 scope 才能创建
}`,
      },
    ],
  },
  {
    id: 'memory-3',
    title: { en: 'Three-Layer Memory', zh: '三层分级记忆' },
    subtitle: { en: 'Memory that thinks, not just stores', zh: '记忆，不只是存档' },
    description: {
      en: 'L3 preserves raw dialogues, L2 distills external summaries, L1 carries global cognition. Memory flows between layers asynchronously.',
      zh: '三层记忆各司其职——L3 保留原始对话，L2 提炼外部摘要，L1 承载全局认知。记忆在层级间异步流动。',
    },
    tabs: [
      {
        name: 'records.jsonl (L3)',
        language: 'json',
        code: `{"role":"user","content":"帮我分析竞品定价策略"}
{"role":"assistant","content":"好的，我来研究 Acme、Vertex、Orbit 三家..."}
{"role":"tool","name":"web_search","result":{"hits":42}}
{"role":"assistant","content":"Acme 席位制 $29/seat，Vertex 按量计费..."}`,
      },
      {
        name: 'index.md (L2)',
        language: 'markdown',
        code: `## 竞品定价分析

### 关键发现
- Acme：席位制 $29/seat，适合中小团队
- Vertex：按量计费，高频用户月均成本低 40%
- Orbit：年付享 8 折，企业版需单独报价

### 待决策
年付折扣策略尚未确认。`,
      },
      {
        name: 'memory.md (L1)',
        language: 'markdown',
        code: `## 用户画像
职业：产品经理，负责 B2B SaaS 定价策略
风格：偏好数据驱动，结论先行

## 跨会话洞察
- 市场分析 × 功能规划存在**定价冲突**：
  按量计费与核心功能高固定成本不兼容`,
      },
    ],
  },
  {
    id: 'global-integration',
    title: { en: 'Global Awareness', zh: '全局意识整合' },
    subtitle: { en: 'Cross-branch insights, auto-detect conflicts', zh: '跨分支洞察，自动发现矛盾' },
    description: {
      en: 'Main Session continuously collects all child Session L2 summaries, synthesizes a global view, and pushes targeted insights.',
      zh: 'Main Session 持续收集所有子 Session 的 L2 摘要，整合为全局视图，发现分支之间的矛盾和依赖。',
    },
    tabs: [
      {
        name: 'synthesis.md',
        language: 'markdown',
        code: `## 全局综合分析

### 活跃分支
1. 竞品定价分析 — 倾向按量计费
2. 功能规划 — AI 集成为最大技术投入
3. 技术选型 — 正在评估框架成本和性能

### 发现的冲突
⚠️ 定价策略（按量计费）与功能规划（高固定成本）存在矛盾

### 建议行动
→ 通知「竞品定价分析」分支考虑成本结构约束`,
      },
      {
        name: 'insight-push.md',
        language: 'markdown',
        code: `## Insight → 竞品定价分析

来源：全局 synthesis
优先级：高

### 内容
你目前倾向按量计费，但功能规划分支确认了核心功能
包含高固定成本的 AI 集成。建议重新评估混合定价模型。

### 触发条件
功能规划分支更新 AI 集成成本估算后自动触发`,
      },
    ],
  },
]

export const GROUP_COLORS: Record<string, string> = {
  'auto-split': '#22c55e',
  'memory-3': '#a855f7',
  'global-integration': '#3b82f6',
}

export const capabilityNodes: TopologyNode[] = [
  { id: 'cap-core', label: '核心能力', x: 250, y: 220, type: 'core' },
  // Primary
  { id: 'cap-split', label: '对话自动分裂', x: 420, y: 100, type: 'primary', group: 'auto-split' },
  { id: 'cap-memory', label: '三层分级记忆', x: 430, y: 340, type: 'primary', group: 'memory-3' },
  { id: 'cap-global', label: '全局意识整合', x: 80, y: 300, type: 'primary', group: 'global-integration' },
  // Child — auto-split
  { id: 'cap-scope', label: 'Scope 定义', x: 500, y: 30, type: 'child', group: 'auto-split' },
  { id: 'cap-guard', label: '分裂保护', x: 530, y: 150, type: 'child', group: 'auto-split' },
  // Child — memory
  { id: 'cap-l3', label: 'L3 原始记录', x: 530, y: 280, type: 'child', group: 'memory-3' },
  { id: 'cap-l2', label: 'L2 外部摘要', x: 530, y: 370, type: 'child', group: 'memory-3' },
  { id: 'cap-l1', label: 'L1 全局认知', x: 460, y: 430, type: 'child', group: 'memory-3' },
  // Child — global
  { id: 'cap-synthesis', label: 'Synthesis', x: 30, y: 390, type: 'child', group: 'global-integration' },
  { id: 'cap-insights', label: 'Insights', x: 30, y: 220, type: 'child', group: 'global-integration' },
  // Decorative
  { id: 'd-fork', label: 'fork', x: 560, y: 210, type: 'decorative' },
  { id: 'd-stream', label: 'stream', x: 320, y: 440, type: 'decorative' },
  { id: 'd-async', label: 'async', x: 10, y: 120, type: 'decorative' },
  { id: 'd-topo', label: 'topology', x: 250, y: 30, type: 'decorative' },
]

export const capabilityEdges: TopologyEdge[] = [
  // Core → primary
  { from: 'cap-core', to: 'cap-split', style: 'solid' },
  { from: 'cap-core', to: 'cap-memory', style: 'solid' },
  { from: 'cap-core', to: 'cap-global', style: 'solid' },
  // Primary → child
  { from: 'cap-split', to: 'cap-scope', style: 'solid' },
  { from: 'cap-split', to: 'cap-guard', style: 'solid' },
  { from: 'cap-memory', to: 'cap-l3', style: 'solid' },
  { from: 'cap-memory', to: 'cap-l2', style: 'solid' },
  { from: 'cap-memory', to: 'cap-l1', style: 'solid' },
  { from: 'cap-global', to: 'cap-synthesis', style: 'solid' },
  { from: 'cap-global', to: 'cap-insights', style: 'solid' },
  // Primary ↔ primary
  { from: 'cap-split', to: 'cap-memory', style: 'dashed' },
  { from: 'cap-memory', to: 'cap-global', style: 'dashed' },
  { from: 'cap-global', to: 'cap-split', style: 'dashed' },
  // Decorative
  { from: 'd-fork', to: 'cap-split', style: 'thin-dashed' },
  { from: 'd-stream', to: 'cap-memory', style: 'thin-dashed' },
  { from: 'd-async', to: 'cap-global', style: 'thin-dashed' },
  { from: 'd-topo', to: 'cap-split', style: 'thin-dashed' },
]
