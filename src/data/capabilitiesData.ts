// src/data/capabilitiesData.ts
// Core capabilities section with interactive topology + code tabs (5 capabilities per PRD v5)
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
    title: { en: 'Three-Layer Memory', zh: '三层分级记忆' },
    subtitle: { en: 'Memory that thinks, not just stores', zh: '记忆，不只是存档' },
    description: {
      en: 'L3 preserves raw dialogues, L2 distills external summaries, L1 carries global cognition. Memory flows between layers asynchronously, never blocking the conversation.',
      zh: '三层记忆各司其职——L3 保留原始对话，L2 提炼外部摘要，L1 承载全局认知。记忆在层级间异步流动，不阻塞对话。',
    },
    tabs: [
      {
        name: 'records.jsonl (L3)',
        language: 'json',
        code: `// L3：完整的原始对话记录，供 Session 自身的 LLM 消费
// ——————————————————————

{"role":"user","content":"帮我分析一下竞品定价策略","ts":"2025-03-14T09:30:00Z"}
{"role":"assistant","content":"好的，我来研究 Acme、Vertex、Orbit 三家...","ts":"2025-03-14T09:30:05Z"}
{"role":"tool","name":"web_search","result":{"hits":42,"top":"acme.io/pricing"},"ts":"2025-03-14T09:30:06Z"}
{"role":"assistant","content":"Acme 席位制 $29/seat，Vertex 按量计费...","ts":"2025-03-14T09:30:12Z"}
{"role":"user","content":"只关注定价，忽略功能对比","ts":"2025-03-14T09:31:02Z"}
{"role":"assistant","content":"明白，聚焦三种定价模型对比...","ts":"2025-03-14T09:31:05Z"}`,
      },
      {
        name: 'index.md (L2)',
        language: 'markdown',
        code: `// L2：提炼后的外部摘要，供 Main Session 消费。子 Session 自身看不到这个文件
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
风格：偏好数据驱动，结论先行，不要废话

## 跨会话洞察
- 市场分析 × 功能规划存在定价冲突：
  按量计费模型与核心功能的高固定成本不兼容
- 技术选型中的 AI 集成成本会显著影响毛利率

## 长期偏好
- 竞品调研优先看定价页和 changelog
- 不信任 G2 评分，偏好 HN/Reddit 真实反馈`,
      },
    ],
  },
  {
    id: 'global-integration',
    title: { en: 'Global Awareness', zh: '全局意识整合' },
    subtitle: { en: 'Cross-branch insights, auto-detect conflicts', zh: '跨分支洞察，自动发现矛盾' },
    description: {
      en: 'Main Session continuously collects all child Session L2 summaries, synthesizes a global view, discovers conflicts and dependencies between branches, and pushes targeted insights. This is the only channel for cross-branch information propagation.',
      zh: 'Main Session 持续收集所有子 Session 的 L2 摘要，整合为全局视图，发现分支之间的矛盾和依赖，并定向推送洞察。这是跨分支信息传播的唯一通道。',
    },
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
⚠️ 技术选型中 AI 集成成本尚未反映到定价模型中

### 建议行动
→ 通知「竞品定价分析」分支考虑成本结构约束
→ 通知「功能规划」分支评估 AI 功能的边际成本`,
      },
      {
        name: 'insight-push.md',
        language: 'markdown',
        code: `// Insight：基于 synthesis 生成的定向建议，推送给特定子 Session
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
    title: { en: 'Zero Overhead in Chat', zh: '对话中零开销' },
    subtitle: { en: 'Memory distillation never blocks conversation', zh: '记忆提炼不阻塞对话' },
    description: {
      en: 'All memory distillation runs asynchronously in the background. The conversation flow is completely unaware. You keep chatting, Stello quietly organizes memory behind the scenes.',
      zh: '所有记忆提炼都在后台异步执行，对话流程完全无感知。你继续聊，Stello 在背后默默整理记忆。',
    },
    tabs: [
      {
        name: 'consolidation.ts',
        language: 'typescript',
        code: `// Consolidation：对话结束后异步将 L3 提炼为 L2，不阻塞对话
// ——————————————————————

// 每轮对话结束后自动触发，fire-and-forget
session.on('turnComplete', async () => {
  // 异步执行，不阻塞下一轮对话
  void session.consolidate({
    strategy: 'incremental',  // 增量提炼，不重写整个 L2
    maxTokens: 500,           // L2 摘要长度上限
  })
})`,
      },
      {
        name: 'integration.ts',
        language: 'typescript',
        code: `// Integration：当子 Session 更新 L2 后，Main Session 重新整合全局视图
// ——————————————————————

// 子 Session 的 L2 更新后，自动触发全局整合
agent.on('consolidationComplete', async ({ sessionId }) => {
  // 重新读取所有 L2，生成最新的 synthesis
  void mainSession.integrate({
    trigger: 'child-updated',
    sourceSession: sessionId,
    generateInsights: true,   // 同时生成定向 insights
  })
})`,
      },
    ],
  },
  {
    id: 'starmap',
    title: { en: 'Star Map Visualization', zh: '星空图可视化' },
    subtitle: { en: 'Your cognitive topology, at a glance', zh: '你的认知拓扑，一眼看全' },
    description: {
      en: 'The entire cognitive topology rendered as a star node graph. Each star represents a thinking direction, connections show relationships, node size maps conversation depth, brightness maps activity level.',
      zh: '整棵认知拓扑渲染为星空节点图。每颗星代表一个思考方向，连线表示关联，节点大小映射对话深度，亮度映射活跃程度。',
    },
    tabs: [
      {
        name: 'node-mapping.ts',
        language: 'typescript',
        code: `// 节点映射：将 Session 的运行时状态实时映射为可视化属性
// ——————————————————————

const nodeStyle = {
  size:       session.messageCount,    // 对话越深，节点越大
  color:      session.category,        // 所属类别决定颜色
  brightness: session.lastActiveAt,    // 最近活跃度映射亮度
  border:     session.hasInsight       // 有未读 insight 时边框高亮
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
  // 点击节点 → 进入该 Session 对话
  router.push(\`/session/\${sessionId}\`)
})

starMap.on('nodeDrag', (sessionId, position) => {
  // 拖拽调整布局 → 持久化位置
  layout.save(sessionId, position)
})

// 缩放：滚轮查看全局或聚焦局部
starMap.enableZoom({ min: 0.3, max: 3.0 })`,
      },
    ],
  },
]

export const GROUP_COLORS: Record<string, string> = {
  'auto-split': '#7b9b8b',
  'memory-3': '#9b7b6b',
  'global-integration': '#6b7b8d',
  'zero-overhead': '#b0956b',
  'starmap': '#8b7b9b',
}

export const capabilityNodes: TopologyNode[] = [
  { id: 'cap-core', label: '核心能力', x: 280, y: 220, type: 'core' },
  // Primary (5 nodes in circular arrangement)
  { id: 'cap-split', label: '对话自动分裂', x: 430, y: 100, type: 'primary', group: 'auto-split' },
  { id: 'cap-memory', label: '三层分级记忆', x: 460, y: 320, type: 'primary', group: 'memory-3' },
  { id: 'cap-global', label: '全局意识整合', x: 160, y: 370, type: 'primary', group: 'global-integration' },
  { id: 'cap-zero', label: '对话中零开销', x: 90, y: 120, type: 'primary', group: 'zero-overhead' },
  { id: 'cap-star', label: '星空图可视化', x: 280, y: 40, type: 'primary', group: 'starmap' },
  // Child — auto-split
  { id: 'cap-scope', label: 'Scope 定义', x: 530, y: 40, type: 'child', group: 'auto-split' },
  { id: 'cap-guard', label: '分裂保护', x: 540, y: 150, type: 'child', group: 'auto-split' },
  // Child — memory
  { id: 'cap-l3', label: 'L3 原始记录', x: 550, y: 260, type: 'child', group: 'memory-3' },
  { id: 'cap-l2', label: 'L2 外部摘要', x: 540, y: 360, type: 'child', group: 'memory-3' },
  { id: 'cap-l1', label: 'L1 全局认知', x: 460, y: 420, type: 'child', group: 'memory-3' },
  // Child — global
  { id: 'cap-synthesis', label: 'Synthesis', x: 80, y: 430, type: 'child', group: 'global-integration' },
  { id: 'cap-insights', label: 'Insights', x: 60, y: 320, type: 'child', group: 'global-integration' },
  // Child — zero-overhead
  { id: 'cap-consolidation', label: 'Consolidation', x: 10, y: 180, type: 'child', group: 'zero-overhead' },
  { id: 'cap-integration', label: 'Integration', x: 10, y: 60, type: 'child', group: 'zero-overhead' },
  // Child — starmap
  { id: 'cap-node-map', label: '节点映射', x: 200, y: 0, type: 'child', group: 'starmap' },
  { id: 'cap-interact', label: '交互能力', x: 360, y: 0, type: 'child', group: 'starmap' },
  // Decorative
  { id: 'd-fork', label: 'fork', x: 560, y: 200, type: 'decorative' },
  { id: 'd-stream', label: 'stream', x: 350, y: 450, type: 'decorative' },
  { id: 'd-async', label: 'async', x: 0, y: 260, type: 'decorative' },
  { id: 'd-topo', label: 'topology', x: 160, y: 0, type: 'decorative' },
  { id: 'd-branch', label: 'branch', x: 430, y: 450, type: 'decorative' },
  { id: 'd-canvas', label: 'canvas', x: 420, y: 0, type: 'decorative' },
]

export const capabilityEdges: TopologyEdge[] = [
  // Core → primary
  { from: 'cap-core', to: 'cap-split', style: 'solid' },
  { from: 'cap-core', to: 'cap-memory', style: 'solid' },
  { from: 'cap-core', to: 'cap-global', style: 'solid' },
  { from: 'cap-core', to: 'cap-zero', style: 'solid' },
  { from: 'cap-core', to: 'cap-star', style: 'solid' },
  // Primary → child
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
  // Primary ↔ primary
  { from: 'cap-split', to: 'cap-memory', style: 'dashed' },
  { from: 'cap-memory', to: 'cap-global', style: 'dashed' },
  { from: 'cap-global', to: 'cap-zero', style: 'dashed' },
  { from: 'cap-zero', to: 'cap-star', style: 'dashed' },
  { from: 'cap-star', to: 'cap-split', style: 'dashed' },
  // Decorative
  { from: 'd-fork', to: 'cap-split', style: 'thin-dashed' },
  { from: 'd-stream', to: 'cap-memory', style: 'thin-dashed' },
  { from: 'd-async', to: 'cap-global', style: 'thin-dashed' },
  { from: 'd-topo', to: 'cap-star', style: 'thin-dashed' },
  { from: 'd-branch', to: 'cap-global', style: 'thin-dashed' },
  { from: 'd-canvas', to: 'cap-star', style: 'thin-dashed' },
]
