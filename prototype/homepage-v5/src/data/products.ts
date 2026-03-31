import type { TopologyNode, TopologyEdge } from './hero'

export interface ProductItem {
  id: string
  title: string
  subtitle: string
  description: string
  tabs: { name: string; language: string; code: string }[]
}

export const products: ProductItem[] = [
  {
    id: 'session',
    title: '@stello-ai/session',
    subtitle: '对话的基本单元',
    description:
      '每个 Session 就是一个技能——L3 是技能的内部知识体，L2 是技能对外暴露的 description。文件格式选择 Markdown 而非 JSON，三个 md 文件 + records.jsonl，对 LLM 和人类都自然可读。如果你只需要一个具备记忆能力的单 Session 抽象，从这个包开始。',
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
    title: '@stello-ai/core',
    subtitle: '编排引擎',
    description:
      '负责 Session 树的调度和编排。Main Session 是全局意识层——它只读 L2、不读子 Session 的 L3，子 Session 之间不直接通信，跨分支信息只通过 Main Session 的 insight 传播。这些隔离是刻意的架构约束，不是限制。',
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

// AI 自动识别话题分叉，创建子 Session
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
    trigger: 'on-consolidation',
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

const result = await agent.turn(sessionId, userMessage)`,
      },
    ],
  },
  {
    id: 'server',
    title: '@stello-ai/server',
    subtitle: '可部署的后端',
    description:
      '将 Stello 从进程内 SDK 升级为可部署的服务。REST + WebSocket 双通道，PostgreSQL 持久化，多租户 Space 隔离。架构完全解耦——不绑定特定 LLM 或前端框架。',
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
      - "3000:3000"
      - "3001:3001"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/stello
      LLM_PROVIDER: openai
    depends_on:
      - db
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data`,
      },
      {
        name: 'rest-api.ts',
        language: 'typescript',
        code: `// REST API：创建 Space 和发送消息
// ——————————————————————

const space = await fetch('/api/spaces', {
  method: 'POST',
  body: JSON.stringify({ name: '产品规划项目' }),
})

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

const pool = new AgentPool({
  maxAgents: 100,
  idleTimeout: '30m',
  storage: postgresAdapter,
})

// 请求进来时按 Space 分发
const agent = await pool.getOrCreate(spaceId)
const result = await agent.turn(sessionId, message)`,
      },
    ],
  },
  {
    id: 'devtools',
    title: '@stello-ai/devtools',
    subtitle: '一行代码接入的调试工具',
    description:
      '星空拓扑图可视化、对话回放、实时事件监控。面向开发阶段，不是生产环境依赖。',
    tabs: [
      {
        name: 'start-devtools.ts',
        language: 'typescript',
        code: `// 一行代码启动 Devtools
// ——————————————————————

import { startDevtools } from '@stello-ai/devtools'

await startDevtools(agent, {
  port: 4800,
  open: true,
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

  console.log(\`[\${event.type}]\`, event.sessionId)
})`,
      },
    ],
  },
]

export const productNodes: TopologyNode[] = [
  { id: 'prod-core', label: 'Stello SDK', x: 250, y: 220, type: 'core' },
  // Primary
  { id: 'prod-session', label: 'session', x: 420, y: 100, type: 'primary', group: 'session' },
  { id: 'prod-core-pkg', label: 'core', x: 420, y: 340, type: 'primary', group: 'core' },
  { id: 'prod-server', label: 'server', x: 80, y: 340, type: 'primary', group: 'server' },
  { id: 'prod-devtools', label: 'devtools', x: 80, y: 100, type: 'primary', group: 'devtools' },
  // Child
  { id: 'prod-l3', label: 'L3 记录', x: 500, y: 50, type: 'child', group: 'session', parentId: 'prod-session' },
  { id: 'prod-l2', label: 'L2 提炼', x: 530, y: 130, type: 'child', group: 'session', parentId: 'prod-session' },
  { id: 'prod-llm', label: 'LLM 适配', x: 510, y: 200, type: 'child', group: 'session', parentId: 'prod-session' },
  { id: 'prod-turn', label: 'turn 执行', x: 510, y: 290, type: 'child', group: 'core', parentId: 'prod-core-pkg' },
  { id: 'prod-fork', label: 'fork 编排', x: 530, y: 370, type: 'child', group: 'core', parentId: 'prod-core-pkg' },
  { id: 'prod-integ', label: 'integration', x: 460, y: 430, type: 'child', group: 'core', parentId: 'prod-core-pkg' },
  { id: 'prod-rest', label: 'REST API', x: 0, y: 290, type: 'child', group: 'server', parentId: 'prod-server' },
  { id: 'prod-pg', label: 'PostgreSQL', x: 0, y: 370, type: 'child', group: 'server', parentId: 'prod-server' },
  { id: 'prod-tenant', label: '多租户', x: 30, y: 430, type: 'child', group: 'server', parentId: 'prod-server' },
  { id: 'prod-star', label: '星空图', x: 0, y: 60, type: 'child', group: 'devtools', parentId: 'prod-devtools' },
  { id: 'prod-replay', label: '对话回放', x: 0, y: 140, type: 'child', group: 'devtools', parentId: 'prod-devtools' },
  { id: 'prod-events', label: '事件监控', x: 30, y: 200, type: 'child', group: 'devtools', parentId: 'prod-devtools' },
  // Decorative
  { id: 'd-adapter', label: 'adapter', x: 560, y: 260, type: 'decorative' },
  { id: 'd-storage', label: 'storage', x: 350, y: 460, type: 'decorative' },
  { id: 'd-plugin', label: 'plugin', x: 150, y: 460, type: 'decorative' },
  { id: 'd-runtime', label: 'runtime', x: 560, y: 30, type: 'decorative' },
  { id: 'd-schema', label: 'schema', x: 250, y: 0, type: 'decorative' },
  { id: 'd-hook', label: 'hook', x: 0, y: 0, type: 'decorative' },
]

export const productEdges: TopologyEdge[] = [
  { from: 'prod-core', to: 'prod-session', style: 'solid' },
  { from: 'prod-core', to: 'prod-core-pkg', style: 'solid' },
  { from: 'prod-core', to: 'prod-server', style: 'solid' },
  { from: 'prod-core', to: 'prod-devtools', style: 'solid' },
  // Children
  { from: 'prod-session', to: 'prod-l3', style: 'solid' },
  { from: 'prod-session', to: 'prod-l2', style: 'solid' },
  { from: 'prod-session', to: 'prod-llm', style: 'solid' },
  { from: 'prod-core-pkg', to: 'prod-turn', style: 'solid' },
  { from: 'prod-core-pkg', to: 'prod-fork', style: 'solid' },
  { from: 'prod-core-pkg', to: 'prod-integ', style: 'solid' },
  { from: 'prod-server', to: 'prod-rest', style: 'solid' },
  { from: 'prod-server', to: 'prod-pg', style: 'solid' },
  { from: 'prod-server', to: 'prod-tenant', style: 'solid' },
  { from: 'prod-devtools', to: 'prod-star', style: 'solid' },
  { from: 'prod-devtools', to: 'prod-replay', style: 'solid' },
  { from: 'prod-devtools', to: 'prod-events', style: 'solid' },
  // Primary-primary
  { from: 'prod-session', to: 'prod-core-pkg', style: 'dashed' },
  { from: 'prod-core-pkg', to: 'prod-server', style: 'dashed' },
  { from: 'prod-server', to: 'prod-devtools', style: 'dashed' },
  { from: 'prod-devtools', to: 'prod-session', style: 'dashed' },
  // Decorative
  { from: 'd-adapter', to: 'prod-session', style: 'thin-dashed' },
  { from: 'd-storage', to: 'prod-core-pkg', style: 'thin-dashed' },
  { from: 'd-plugin', to: 'prod-server', style: 'thin-dashed' },
  { from: 'd-runtime', to: 'prod-session', style: 'thin-dashed' },
  { from: 'd-schema', to: 'prod-core-pkg', style: 'thin-dashed' },
  { from: 'd-hook', to: 'prod-devtools', style: 'thin-dashed' },
]
