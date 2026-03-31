import type { TopologyNode, TopologyEdge } from './hero'

export interface CapabilityItem {
  id: string
  title: string
  subtitle: string
  description: string
  tabs: { name: string; language: string; code: string }[]
}

export const capabilities: CapabilityItem[] = [
  {
    id: 'auto-split',
    title: '对话自动分裂',
    subtitle: '让思路自由分叉',
    description:
      '当 AI 发现话题开始分叉，会自动通过工具调用创建子 Session。每个分支有明确的 scope 边界，互不干扰。',
    tabs: [
      {
        name: 'scope.md',
        language: 'markdown',
        code: `// 子 Session 创建时，AI 自动生成 scope 来界定讨论边界
// ——————————————————————

# Session Scope

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
        name: 'split-guard.config.ts',
        language: 'typescript',
        code: `// SplitGuard 控制分裂行为，防止拓扑过度膨胀
// ——————————————————————

const splitGuard = {
  maxDepth: 3,              // 最多 3 层嵌套
  maxChildren: 8,           // 单个 Session 最多 8 个子分支
  confirmMode: 'auto',      // 'auto' | 'ask' | 'deny'
  cooldown: 3,              // 同一 Session 3 轮对话内不再分裂
  scopeRequired: true,      // 必须生成 scope 才能创建子 Session
}`,
      },
    ],
  },
  {
    id: 'memory-3',
    title: '三层分级记忆',
    subtitle: '记忆，不只是存档',
    description:
      '三层记忆各司其职——L3 保留原始对话，L2 提炼外部摘要，L1 承载全局认知。记忆在层级间异步流动，不阻塞对话。',
    tabs: [
      {
        name: 'records.jsonl (L3)',
        language: 'json',
        code: `// L3：完整的原始对话记录，供 Session 自身的 LLM 消费
// ——————————————————————

{"role":"user","content":"帮我分析一下竞品定价策略","ts":"2025-03-14T09:30:00Z"}
{"role":"assistant","content":"好的，我来研究 Acme、Vertex、Orbit 三家...","ts":"2025-03-14T09:30:05Z"}
{"role":"tool","name":"web_search","result":{"hits":42},"ts":"2025-03-14T09:30:06Z"}
{"role":"assistant","content":"Acme 席位制 $29/seat，Vertex 按量计费...","ts":"2025-03-14T09:30:12Z"}`,
      },
      {
        name: 'index.md (L2)',
        language: 'markdown',
        code: `// L2：提炼后的外部摘要，供 Main Session 消费
// ——————————————————————

## 竞品定价分析

### 当前状态
用户正在对比三家竞品的定价模型（按量/按席位/混合）。

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
        code: `// L1：全局认知状态，应用层可直接读写，所有 Session 共享
// ——————————————————————

## 用户画像
职业：产品经理，负责 B2B SaaS 定价策略
风格：偏好数据驱动，结论先行

## 跨会话洞察
- 市场分析 × 功能规划存在**定价冲突**：
  按量计费模型与核心功能的高固定成本不兼容
- 技术选型中的 AI 集成成本会显著影响毛利率`,
      },
    ],
  },
  {
    id: 'global-integration',
    title: '全局意识整合',
    subtitle: '跨分支洞察，自动发现矛盾',
    description:
      'Main Session 持续收集所有子 Session 的 L2 摘要，整合为全局视图，发现分支之间的矛盾和依赖，并定向推送洞察。',
    tabs: [
      {
        name: 'synthesis.md',
        language: 'markdown',
        code: `// Synthesis：整合所有子 Session 的 L2，形成全局视图
// ——————————————————————

## 全局综合分析

### 活跃分支
1. 竞品定价分析 — 已完成初步调研，倾向按量计费
2. 功能规划 — 核心功能列表已确定，AI 集成为最大技术投入
3. 技术选型 — 正在评估三个框架的成本和性能

### 发现的冲突
⚠️ 定价策略（按量计费）与功能规划（高固定成本 AI 功能）存在矛盾

### 建议行动
→ 通知「竞品定价分析」分支考虑成本结构约束`,
      },
      {
        name: 'insight-push.md',
        language: 'markdown',
        code: `// Insight：定向建议，推送给特定子 Session
// ——————————————————————

## Insight → 竞品定价分析

来源：全局 synthesis
优先级：高

### 内容
你目前倾向按量计费，但功能规划分支确认了核心功能包含
高固定成本的 AI 集成。按量计费可能导致低用量用户无法
覆盖成本。建议重新评估混合定价模型。

### 触发条件
功能规划分支更新了 AI 集成成本估算后自动触发`,
      },
    ],
  },
  {
    id: 'zero-overhead',
    title: '对话中零开销',
    subtitle: '记忆提炼不阻塞对话',
    description:
      '所有记忆提炼都在后台异步执行，对话流程完全无感知。你继续聊，Stello 在背后默默整理记忆。',
    tabs: [
      {
        name: 'consolidation.ts',
        language: 'typescript',
        code: `// Consolidation：对话结束后异步将 L3 提炼为 L2
// ——————————————————————

// 每轮对话结束后自动触发，fire-and-forget
session.on('turnComplete', async () => {
  // 异步执行，不阻塞下一轮对话
  void session.consolidate({
    strategy: 'incremental',
    maxTokens: 500,
  })
})`,
      },
      {
        name: 'integration.ts',
        language: 'typescript',
        code: `// Integration：子 Session 更新 L2 后，重新整合全局视图
// ——————————————————————

agent.on('consolidationComplete', async ({ sessionId }) => {
  // 重新读取所有 L2，生成最新的 synthesis
  void mainSession.integrate({
    trigger: 'child-updated',
    sourceSession: sessionId,
    generateInsights: true,
  })
})`,
      },
    ],
  },
  {
    id: 'starmap',
    title: '星空图可视化',
    subtitle: '你的认知拓扑，一眼看全',
    description:
      '整棵认知拓扑渲染为星空节点图。每颗星代表一个思考方向，连线表示关联，节点大小映射对话深度，亮度映射活跃程度。',
    tabs: [
      {
        name: 'node-mapping.ts',
        language: 'typescript',
        code: `// 节点映射：Session 状态实时映射为可视化属性
// ——————————————————————

const nodeStyle = {
  size:       session.messageCount,
  color:      session.category,
  brightness: session.lastActiveAt,
  border:     session.hasInsight
    ? '2px solid #FFD700'
    : 'none',
}`,
      },
      {
        name: 'interactions.ts',
        language: 'typescript',
        code: `// 交互：拓扑图不只是展示，也是操作入口
// ——————————————————————

starMap.on('nodeClick', (sessionId) => {
  router.push(\`/session/\${sessionId}\`)
})

starMap.on('nodeDrag', (sessionId, position) => {
  layout.save(sessionId, position)
})

starMap.enableZoom({ min: 0.3, max: 3.0 })`,
      },
    ],
  },
]

export const capabilityNodes: TopologyNode[] = [
  { id: 'cap-core', label: '核心能力', x: 250, y: 220, type: 'core' },
  // Primary nodes
  { id: 'cap-split', label: '对话自动分裂', x: 420, y: 100, type: 'primary', group: 'auto-split' },
  { id: 'cap-memory', label: '三层分级记忆', x: 430, y: 340, type: 'primary', group: 'memory-3' },
  { id: 'cap-global', label: '全局意识整合', x: 80, y: 340, type: 'primary', group: 'global-integration' },
  { id: 'cap-zero', label: '对话中零开销', x: 70, y: 100, type: 'primary', group: 'zero-overhead' },
  { id: 'cap-star', label: '星空图可视化', x: 250, y: 40, type: 'primary', group: 'starmap' },
  // Child nodes
  { id: 'cap-scope', label: 'Scope 定义', x: 500, y: 50, type: 'child', group: 'auto-split', parentId: 'cap-split' },
  { id: 'cap-guard', label: '分裂保护', x: 520, y: 140, type: 'child', group: 'auto-split', parentId: 'cap-split' },
  { id: 'cap-l3', label: 'L3 原始记录', x: 520, y: 290, type: 'child', group: 'memory-3', parentId: 'cap-memory' },
  { id: 'cap-l2', label: 'L2 外部摘要', x: 520, y: 370, type: 'child', group: 'memory-3', parentId: 'cap-memory' },
  { id: 'cap-l1', label: 'L1 全局认知', x: 460, y: 430, type: 'child', group: 'memory-3', parentId: 'cap-memory' },
  { id: 'cap-synthesis', label: 'Synthesis', x: 30, y: 420, type: 'child', group: 'global-integration', parentId: 'cap-global' },
  { id: 'cap-insights', label: 'Insights', x: 120, y: 420, type: 'child', group: 'global-integration', parentId: 'cap-global' },
  { id: 'cap-consolidation', label: 'Consolidation', x: 10, y: 170, type: 'child', group: 'zero-overhead', parentId: 'cap-zero' },
  { id: 'cap-integration', label: 'Integration', x: 10, y: 60, type: 'child', group: 'zero-overhead', parentId: 'cap-zero' },
  { id: 'cap-node-map', label: '节点映射', x: 170, y: 10, type: 'child', group: 'starmap', parentId: 'cap-star' },
  { id: 'cap-interact', label: '交互能力', x: 340, y: 10, type: 'child', group: 'starmap', parentId: 'cap-star' },
  // Decorative
  { id: 'd-fork', label: 'fork', x: 560, y: 200, type: 'decorative' },
  { id: 'd-branch2', label: 'branch', x: 350, y: 460, type: 'decorative' },
  { id: 'd-stream', label: 'stream', x: 560, y: 430, type: 'decorative' },
  { id: 'd-async', label: 'async', x: 0, y: 270, type: 'decorative' },
  { id: 'd-topo', label: 'topology', x: 400, y: 0, type: 'decorative' },
  { id: 'd-canvas', label: 'canvas', x: 100, y: 0, type: 'decorative' },
]

export const capabilityEdges: TopologyEdge[] = [
  // Core -> primary
  { from: 'cap-core', to: 'cap-split', style: 'solid' },
  { from: 'cap-core', to: 'cap-memory', style: 'solid' },
  { from: 'cap-core', to: 'cap-global', style: 'solid' },
  { from: 'cap-core', to: 'cap-zero', style: 'solid' },
  { from: 'cap-core', to: 'cap-star', style: 'solid' },
  // Primary -> child
  { from: 'cap-split', to: 'cap-scope', style: 'solid' },
  { from: 'cap-split', to: 'cap-guard', style: 'solid' },
  { from: 'cap-memory', to: 'cap-l3', style: 'solid' },
  { from: 'cap-memory', to: 'cap-l2', style: 'solid' },
  { from: 'cap-memory', to: 'cap-l1', style: 'solid' },
  { from: 'cap-global', to: 'cap-synthesis', style: 'solid' },
  { from: 'cap-global', to: 'cap-insights', style: 'solid' },
  { from: 'cap-zero', to: 'cap-consolidation', style: 'solid' },
  { from: 'cap-zero', to: 'cap-integration', style: 'solid' },
  { from: 'cap-star', to: 'cap-node-map', style: 'solid' },
  { from: 'cap-star', to: 'cap-interact', style: 'solid' },
  // Primary <-> primary
  { from: 'cap-split', to: 'cap-memory', style: 'dashed' },
  { from: 'cap-memory', to: 'cap-global', style: 'dashed' },
  { from: 'cap-global', to: 'cap-zero', style: 'dashed' },
  { from: 'cap-zero', to: 'cap-star', style: 'dashed' },
  { from: 'cap-star', to: 'cap-split', style: 'dashed' },
  // Decorative
  { from: 'd-fork', to: 'cap-split', style: 'thin-dashed' },
  { from: 'd-branch2', to: 'cap-memory', style: 'thin-dashed' },
  { from: 'd-stream', to: 'cap-memory', style: 'thin-dashed' },
  { from: 'd-async', to: 'cap-zero', style: 'thin-dashed' },
  { from: 'd-topo', to: 'cap-star', style: 'thin-dashed' },
  { from: 'd-canvas', to: 'cap-star', style: 'thin-dashed' },
]
