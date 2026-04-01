// src/data/productOverviewData.ts
// Screen 3: Product Overview — 4 packages with topology + code tabs
import type { TopologyNode, TopologyEdge } from '../components/TopologyGraph'

export interface ProductTab {
  name: string
  language: string
  code: string
}

export interface ProductItem {
  id: string
  title: { en: string; zh: string }
  subtitle: { en: string; zh: string }
  description: { en: string; zh: string }
  tabs: ProductTab[]
}

export const products: ProductItem[] = [
  {
    id: 'session',
    title: { en: '@stello-ai/session', zh: '@stello-ai/session' },
    subtitle: { en: 'The basic unit of conversation', zh: '对话的基本单元' },
    description: {
      en: 'Each Session is a skill — L3 is the skill\'s internal knowledge base, L2 is the skill\'s externally exposed description. File format uses Markdown over JSON — three .md files + records.jsonl, naturally readable by both LLMs and humans. Start here if you just need a single Session abstraction with memory.',
      zh: '每个 Session 就是一个技能——L3 是技能的内部知识体，L2 是技能对外暴露的 description。文件格式选择 Markdown 而非 JSON，三个 md 文件 + records.jsonl，对 LLM 和人类都自然可读。如果你只需要一个具备记忆能力的单 Session 抽象，从这个包开始。',
    },
    tabs: [
      {
        name: 'create-session.ts',
        language: 'typescript',
        code: `// 创建一个具备三层记忆的 Session
// ——————————————————————

import { createSession } from '@stello-ai/session'

const session = await createSession({
  id: 'pricing-analysis',
  scope: '竞品定价策略分析',
  llm: yourLLMAdapter,
  storage: fileSystemAdapter('./data'),
})

// 发送消息，Session 自动管理 L3 记录
const reply = await session.send('帮我对比三家竞品的定价模型')`,
      },
      {
        name: 'consolidate.ts',
        language: 'typescript',
        code: `// L3 → L2：将原始对话提炼为外部摘要
// ——————————————————————

// 对话结束后，异步提炼 L2
await session.consolidate({
  strategy: 'incremental',
  maxTokens: 500,
})

// 产出的 L2 写入 index.md
// 子 Session 自身看不到这个文件——这是设计约束，不是 bug`,
      },
      {
        name: 'session-files',
        language: 'text',
        code: `// 每个 Session 目录的文件结构（Markdown 优先）
// ——————————————————————

pricing-analysis/
├── memory.md        # L1 全局认知，应用层可直接读写
├── scope.md         # Session 边界定义，AI 创建时自动生成
├── index.md         # L2 外部摘要，供 Main Session 消费
└── records.jsonl    # L3 原始对话记录，完整保留`,
      },
    ],
  },
  {
    id: 'core',
    title: { en: '@stello-ai/core', zh: '@stello-ai/core' },
    subtitle: { en: 'The orchestration engine', zh: '编排引擎' },
    description: {
      en: 'Handles Session tree scheduling and orchestration. Main Session is the global awareness layer — it reads only L2, never child Session L3. Child Sessions don\'t communicate directly; cross-branch info propagates only through Main Session insights. These isolations are intentional architectural constraints. Use this package when you need multi-branch conversations + global synthesis.',
      zh: '负责 Session 树的调度和编排。Main Session 是全局意识层——它只读 L2、不读子 Session 的 L3，子 Session 之间不直接通信，跨分支信息只通过 Main Session 的 insight 传播。这些隔离是刻意的架构约束，不是限制。如果你需要多分支对话 + 全局整合，用这个包。',
    },
    tabs: [
      {
        name: 'create-agent.ts',
        language: 'typescript',
        code: `// 创建一个完整的 Stello Agent
// ——————————————————————

import { createStelloAgent } from '@stello-ai/core'

const agent = await createStelloAgent({
  sessions: sessionTree,
  session: {
    llm: yourLLMAdapter,
    sessionResolver: async (id) => loadSession(id),
  },
})

// 开始对话——AI 自动识别话题分叉，创建子 Session
const result = await agent.turn('main', '帮我规划一个产品策略')`,
      },
      {
        name: 'fork-strategy.ts',
        language: 'typescript',
        code: `// Fork 编排：控制 Session 树的分裂策略
// ——————————————————————

const agent = await createStelloAgent({
  fork: {
    maxDepth: 3,
    maxChildren: 8,
    confirmMode: 'auto',
    guard: splitGuardConfig,
  },
  integration: {
    trigger: 'on-consolidation',  // L2 更新后自动整合
    generateInsights: true,
  },
})`,
      },
      {
        name: 'orchestration.ts',
        language: 'typescript',
        code: `// Turn 执行：带 tool-call loop 的对话循环
// ——————————————————————

// agent.turn 内部自动处理：
// 1. 组装 prompt（注入 L1 + insights + scope）
// 2. 调用 LLM
// 3. 如果 LLM 调用了 fork tool → 创建子 Session
// 4. 如果 LLM 调用了其他 tool → 执行并继续循环
// 5. 对话结束 → 异步触发 consolidation

const result = await agent.turn(sessionId, userMessage)
// result.response   — LLM 回复
// result.forked     — 本轮是否创建了子 Session
// result.toolCalls  — 工具调用记录`,
      },
    ],
  },
  {
    id: 'server',
    title: { en: '@stello-ai/server', zh: '@stello-ai/server' },
    subtitle: { en: 'Deployable backend', zh: '可部署的后端' },
    description: {
      en: 'Upgrades Stello from an in-process SDK to a deployable service. REST + WebSocket dual-channel, PostgreSQL persistence, multi-tenant Space isolation. Fully decoupled architecture — not bound to any specific LLM or frontend framework, pluggable storage layer. Use this package for production deployment.',
      zh: '将 Stello 从进程内 SDK 升级为可部署的服务。REST + WebSocket 双通道，PostgreSQL 持久化，多租户 Space 隔离。架构完全解耦——不绑定特定 LLM 或前端框架，存储层可插拔。如果你需要生产级部署，用这个包。',
    },
    tabs: [
      {
        name: 'docker-compose.yml',
        language: 'yaml',
        code: `# 一键部署 Stello Server
# ——————————————————————

version: '3.8'
services:
  stello:
    image: stello-ai/server:latest
    ports:
      - "3000:3000"       # REST API
      - "3001:3001"       # WebSocket
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/stello
      LLM_PROVIDER: openai
      LLM_API_KEY: \${OPENAI_API_KEY}
    depends_on:
      - db
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
      },
      {
        name: 'rest-api.ts',
        language: 'typescript',
        code: `// REST API：创建 Space 和发送消息
// ——————————————————————

// 创建一个隔离的工作空间
const space = await fetch('/api/spaces', {
  method: 'POST',
  body: JSON.stringify({ name: '产品规划项目' }),
})

// 在 Space 中发送消息
const reply = await fetch(\`/api/spaces/\${spaceId}/turn\`, {
  method: 'POST',
  body: JSON.stringify({
    sessionId: 'main',
    message: '帮我规划一个产品策略',
  }),
})`,
      },
      {
        name: 'multi-tenant.ts',
        language: 'typescript',
        code: `// 多租户：每个 Space 完全隔离
// ——————————————————————

// AgentPool 懒加载 + 自动回收
const pool = new AgentPool({
  maxAgents: 100,
  idleTimeout: '30m',        // 30 分钟无活动自动回收
  storage: postgresAdapter,  // 所有 Space 共享同一个数据库
})

// 请求进来时按 Space 分发
const agent = await pool.getOrCreate(spaceId)
const result = await agent.turn(sessionId, message)`,
      },
    ],
  },
  {
    id: 'devtools',
    title: { en: '@stello-ai/devtools', zh: '@stello-ai/devtools' },
    subtitle: { en: 'One-line debug tools', zh: '一行代码接入的调试工具' },
    description: {
      en: 'Star map topology visualization, conversation replay, real-time event monitoring. Apple Liquid Glass visual style. For development only — not a production dependency.',
      zh: '星空拓扑图可视化、对话回放、实时事件监控。Apple Liquid Glass 视觉风格。面向开发阶段，不是生产环境依赖。',
    },
    tabs: [
      {
        name: 'start-devtools.ts',
        language: 'typescript',
        code: `// 一行代码启动 Devtools
// ——————————————————————

import { startDevtools } from '@stello-ai/devtools'

await startDevtools(agent, {
  port: 4800,
  open: true,   // 自动打开浏览器
})

// 浏览器打开 http://localhost:4800
// 看到：星空拓扑图 + 对话面板 + 实时事件流`,
      },
      {
        name: 'event-stream.ts',
        language: 'typescript',
        code: `// 事件监控：观察 Agent 运行时的所有事件
// ——————————————————————

agent.on('*', (event) => {
  // turnStart / turnComplete
  // consolidationStart / consolidationComplete
  // integrationStart / integrationComplete
  // sessionCreated / sessionArchived
  // insightPushed

  console.log(\`[\${event.type}]\`, event.sessionId, event.data)
})`,
      },
    ],
  },
]

export const PRODUCT_GROUP_COLORS: Record<string, string> = {
  session: '#7b9b8b',
  core: '#9b7b6b',
  server: '#6b7b8d',
  devtools: '#b0956b',
}

export const productNodes: TopologyNode[] = [
  { id: 'pkg-core', label: 'Stello SDK', x: 280, y: 220, type: 'core' },
  // Primary
  { id: 'pkg-session', label: 'session', x: 430, y: 100, type: 'primary', group: 'session' },
  { id: 'pkg-stello-core', label: 'core', x: 450, y: 340, type: 'primary', group: 'core' },
  { id: 'pkg-server', label: 'server', x: 110, y: 340, type: 'primary', group: 'server' },
  { id: 'pkg-devtools', label: 'devtools', x: 100, y: 100, type: 'primary', group: 'devtools' },
  // Child — session
  { id: 'pkg-s-l3', label: 'L3 记录', x: 520, y: 30, type: 'child', group: 'session' },
  { id: 'pkg-s-l2', label: 'L2 提炼', x: 540, y: 130, type: 'child', group: 'session' },
  { id: 'pkg-s-llm', label: 'LLM 适配', x: 520, y: 200, type: 'child', group: 'session' },
  // Child — core
  { id: 'pkg-c-turn', label: 'turn 执行', x: 540, y: 280, type: 'child', group: 'core' },
  { id: 'pkg-c-fork', label: 'fork 编排', x: 530, y: 370, type: 'child', group: 'core' },
  { id: 'pkg-c-int', label: 'integration 调度', x: 450, y: 430, type: 'child', group: 'core' },
  // Child — server
  { id: 'pkg-sv-rest', label: 'REST API', x: 20, y: 390, type: 'child', group: 'server' },
  { id: 'pkg-sv-pg', label: 'PostgreSQL', x: 20, y: 300, type: 'child', group: 'server' },
  { id: 'pkg-sv-mt', label: '多租户', x: 50, y: 430, type: 'child', group: 'server' },
  // Child — devtools
  { id: 'pkg-d-star', label: '星空图', x: 10, y: 50, type: 'child', group: 'devtools' },
  { id: 'pkg-d-replay', label: '对话回放', x: 30, y: 150, type: 'child', group: 'devtools' },
  { id: 'pkg-d-event', label: '事件监控', x: 10, y: 190, type: 'child', group: 'devtools' },
  // Decorative
  { id: 'd-adapter', label: 'adapter', x: 560, y: 160, type: 'decorative' },
  { id: 'd-storage', label: 'storage', x: 300, y: 450, type: 'decorative' },
  { id: 'd-plugin', label: 'plugin', x: 0, y: 240, type: 'decorative' },
  { id: 'd-runtime', label: 'runtime', x: 180, y: 0, type: 'decorative' },
  { id: 'd-schema', label: 'schema', x: 400, y: 0, type: 'decorative' },
  { id: 'd-hook', label: 'hook', x: 170, y: 450, type: 'decorative' },
]

export const productEdges: TopologyEdge[] = [
  // Core → primary
  { from: 'pkg-core', to: 'pkg-session', style: 'solid' },
  { from: 'pkg-core', to: 'pkg-stello-core', style: 'solid' },
  { from: 'pkg-core', to: 'pkg-server', style: 'solid' },
  { from: 'pkg-core', to: 'pkg-devtools', style: 'solid' },
  // Primary → child
  { from: 'pkg-session', to: 'pkg-s-l3', style: 'solid' },
  { from: 'pkg-session', to: 'pkg-s-l2', style: 'solid' },
  { from: 'pkg-session', to: 'pkg-s-llm', style: 'solid' },
  { from: 'pkg-stello-core', to: 'pkg-c-turn', style: 'solid' },
  { from: 'pkg-stello-core', to: 'pkg-c-fork', style: 'solid' },
  { from: 'pkg-stello-core', to: 'pkg-c-int', style: 'solid' },
  { from: 'pkg-server', to: 'pkg-sv-rest', style: 'solid' },
  { from: 'pkg-server', to: 'pkg-sv-pg', style: 'solid' },
  { from: 'pkg-server', to: 'pkg-sv-mt', style: 'solid' },
  { from: 'pkg-devtools', to: 'pkg-d-star', style: 'solid' },
  { from: 'pkg-devtools', to: 'pkg-d-replay', style: 'solid' },
  { from: 'pkg-devtools', to: 'pkg-d-event', style: 'solid' },
  // Primary ↔ primary
  { from: 'pkg-session', to: 'pkg-stello-core', style: 'dashed' },
  { from: 'pkg-stello-core', to: 'pkg-server', style: 'dashed' },
  { from: 'pkg-server', to: 'pkg-devtools', style: 'dashed' },
  { from: 'pkg-devtools', to: 'pkg-session', style: 'dashed' },
  // Decorative
  { from: 'd-adapter', to: 'pkg-session', style: 'thin-dashed' },
  { from: 'd-storage', to: 'pkg-stello-core', style: 'thin-dashed' },
  { from: 'd-plugin', to: 'pkg-server', style: 'thin-dashed' },
  { from: 'd-runtime', to: 'pkg-devtools', style: 'thin-dashed' },
  { from: 'd-schema', to: 'pkg-session', style: 'thin-dashed' },
  { from: 'd-hook', to: 'pkg-server', style: 'thin-dashed' },
]
