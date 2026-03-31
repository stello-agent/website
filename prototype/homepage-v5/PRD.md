# Stello 官网首页 PRD v5

## 概述

Stello 官网首页（Overview）是用户接触 Stello 的第一入口。目标：3 秒内传递"Stello 是什么"，30 秒内让开发者理解核心能力，60 秒内完成转化（点击快速开始或 GitHub Star）。

首页共五屏：

| 屏 | 名称 | 职责 | 卡片形式 | 布局 |
| --- | --- | --- | --- | --- |
| 第一屏 | Hero | 品牌认知 + 概念导览 | 三张卡片 + hover 联动拓扑图 | 左卡片右拓扑 |
| 第二屏 | 核心能力 | 技术卖点展示 | 代码 tab 卡片（两层节点） | 左拓扑右卡片 |
| 第三屏 | 产品概览 | 四个包介绍 | 代码 tab 卡片（两层节点） | 左卡片右拓扑 |
| 第四屏 | 落地场景 | 场景化理解 | 纯文字卡片（两层节点） | 左拓扑右卡片 |
| 第五屏 | CTA | 转化收口 | 居中排列 | — |

> **⚠️ 研发注意：** 本 PRD 中第二屏（核心能力）和第三屏（产品概览）的代码 tab 内容为 mock 示例，API 命名和参数结构仅供参考，不代表真实实现。研发在实现时请对照仓库 `packages/` 下各包的实际导出 API 替换为真实代码片段。仓库地址：https://github.com/stello-agent/stello

---

## 导航栏

| 位置 | 元素 |
| --- | --- |
| 左侧 | Stello logo + 文字 |
| 中部 | Overview · Docs · Blog · Cases |
| 右侧 | 暗色切换 · 语言切换 · GitHub 外链 |

---

## 第一屏：Hero

### 目标

3 秒内传递 Stello 的品牌和核心主张。概念层面的导览，不下沉到技术细节。

### 布局

上部居中 + 下部左右分栏（左侧三张卡片 + 右侧拓扑图）。

### 上部（居中）

- **一行标题**：`Stello — 首个开源 Agent 认知拓扑引擎`
- **打字机轮播 slogan**（每句停留 3-4 秒）：
  - "把对话，变成认知拓扑网络"
  - "用 AI Native 的方式认识世界"
  - "你的思维正在发散成长！别让线性对话限制了它！"
  - "多分支并行探索，全局意识自动整合"
- **CTA 按钮**：
  - 主按钮："快速开始 →"（跳转文档 Getting Started）
  - 次按钮："GitHub ⭐"（跳转 GitHub 仓库）
  - 三级按钮："联系我们"（跳转联系页或弹出联系方式）

### 下部左侧：三张卡片

卡片纵向平铺，无需点击切换。

| 序号 | 卡片标题 | 卡片内容 |
| --- | --- | --- |
| 1 | 线性对话正在拖垮你和 AI | 你是否会碰到：话题越聊越岔，硬塞一个窗口里互相污染。关掉页面什么都没留下，几天后想继续完全想不起来。**你需要的不是更强的模型，而是更好的协作方式。** |
| 2 | 首个 Agent 认知拓扑引擎 | 话题分叉时自动拆出独立分支，每个方向独立深入互不干扰。三层记忆帮你记住一切，全局意识层帮你发现分支之间的矛盾。**关掉页面，结构还在。** |
| 3 | 构建下一代 Agent 应用 | 给你的 Agent 加上分支对话、分级记忆和跨分支洞察。Session 管分支，Skill 管能力，Tool 管执行。**从单 Session 到完整拓扑，渐进式接入。** |

### 下部右侧：拓扑图

**核心节点：** Stello（蓝色大圆，居中，最大视觉权重）

**一级节点（围绕 Stello 展开，中等大小）：**

| 节点名 | 所属卡片 | 颜色 |
| --- | --- | --- |
| 线性对话 | 困境 | 灰色（表示旧模式） |
| 上下文丢失 | 困境 | 灰色 |
| 结构遗忘 | 困境 | 灰色 |
| Session 拓扑 | 是什么 | 绿色（表示 Stello 能力） |
| 三层记忆 | 是什么 | 绿色 |
| 全局意识 | 是什么 | 绿色 |
| Skill 协议 | 能做什么 | 紫色（表示开发者用途） |
| Tool 调用 | 能做什么 | 紫色 |
| Agent 构建 | 能做什么 | 紫色 |

**装饰节点（小圆，低透明度，不可交互）：** 分支、洞察、认知网络、思维发散、星空图、记忆流动

**连线：**
- Stello 与所有一级节点：实线连接
- 一级节点之间：同组内虚线连接（表示关联）
- 装饰节点与就近一级节点：细虚线

**交互行为：**
- 默认状态：所有节点可见，Stello 核心节点高亮，其余节点中等透明度
- hover "困境"卡片 → 灰色节点组高亮，其余降低透明度
- hover "是什么"卡片 → 绿色节点组高亮
- hover "能做什么"卡片 → 紫色节点组高亮
- 鼠标离开卡片 → 恢复默认状态

### 移动端适配

标题和打字机堆叠居中。拓扑图缩小置于三张卡片上方，hover 联动改为静态展示（所有节点常亮）。

---

## 第二屏：核心能力

### 目标

展示 Stello 的技术核心卖点，两层节点深入细节。

### 布局

左侧拓扑图 + 右侧内容卡片区域。

### 左侧：拓扑图

**核心节点：** 核心能力（蓝色大圆，居中）

**大节点（一级，围绕核心节点，紫色中圆）：**

| 节点名 | 位置方向 |
| --- | --- |
| 对话自动分裂 | 右上 |
| 三层分级记忆 | 右下 |
| 全局意识整合 | 左下 |
| 对话中零开销 | 左上 |
| 星空图可视化 | 上方 |

**子节点（二级，围绕各自父节点，绿色小圆）：**

| 父节点 | 子节点 |
| --- | --- |
| 对话自动分裂 | Scope 定义、分裂保护 |
| 三层分级记忆 | L3 原始记录、L2 外部摘要、L1 全局认知 |
| 全局意识整合 | Synthesis、Insights |
| 对话中零开销 | Consolidation、Integration |
| 星空图可视化 | 节点映射、交互能力 |

**装饰节点：** fork、branch、stream、async、topology、canvas

**连线：**
- 核心节点与大节点：实线
- 大节点与子节点：实线
- 大节点之间：虚线
- 装饰节点与就近节点：细虚线

**交互行为：**
- 默认选中"对话自动分裂"，该节点及其子节点高亮，卡片区显示对应内容
- 点击大节点 → 高亮该节点及其子节点，卡片区切换到大节点内容
- 点击子节点 → 高亮该子节点，下层 tab 切换，拓扑图同步高亮
- 非选中节点降低透明度

### 右侧：内容卡片

卡片分为上下两层结构：

- **上层（固定区）：** 当前选中大节点的标题 + 一段描述。点击另一个大节点时才切换
- **下层（文件预览框）：** 顶部文件 tab 栏，每个 tab 对应一个子节点。点击 tab 切换文件内容，拓扑图同步高亮对应子节点。双向联动：点拓扑图子节点也会切换 tab

**交互流程：**
1. 点击大节点 → 上层切换到该大节点描述，下层默认显示第一个 tab
2. 点击子节点（或 tab）→ 上层不变，下层切换到对应 tab 内容
3. 拓扑图同步高亮

---

#### 大节点：对话自动分裂

**上层：**
- 标题：让思路自由分叉
- 描述：当 AI 发现话题开始分叉，会自动通过工具调用创建子 Session。每个分支有明确的 scope 边界，互不干扰。

**下层 tab：**

**tab: scope.md**
```markdown
// 子 Session 创建时，AI 自动生成 scope 来界定讨论边界
// ——————————————————————

# Session Scope

## 主题
竞品定价策略分析

## 边界
- 仅讨论 Acme、Vertex、Orbit 三家的定价模型
- 不涉及产品功能对比
- 产出：定价模型对比表 + 建议

## 创建来源
由主对话在讨论"产品策略"时自动分裂
```

**tab: split-guard.config.ts**
```typescript
// SplitGuard 控制分裂行为，防止拓扑过度膨胀
// ——————————————————————

const splitGuard = {
  maxDepth: 3,              // 最多 3 层嵌套
  maxChildren: 8,           // 单个 Session 最多 8 个子分支
  confirmMode: 'auto',      // 'auto' | 'ask' | 'deny'
  cooldown: 3,              // 同一 Session 3 轮对话内不再分裂
  scopeRequired: true,      // 必须生成 scope 才能创建子 Session
}
```

---

#### 大节点：三层分级记忆

**上层：**
- 标题：记忆，不只是存档
- 描述：三层记忆各司其职——L3 保留原始对话，L2 提炼外部摘要，L1 承载全局认知。记忆在层级间异步流动，不阻塞对话。

**下层 tab：**

**tab: records.jsonl (L3)**
```json
// L3：完整的原始对话记录，供 Session 自身的 LLM 消费
// ——————————————————————

{"role":"user","content":"帮我分析一下竞品定价策略","ts":"2025-03-14T09:30:00Z"}
{"role":"assistant","content":"好的，我来研究 Acme、Vertex、Orbit 三家...","ts":"2025-03-14T09:30:05Z"}
{"role":"tool","name":"web_search","result":{"hits":42,"top":"acme.io/pricing"},"ts":"2025-03-14T09:30:06Z"}
{"role":"assistant","content":"Acme 席位制 $29/seat，Vertex 按量计费...","ts":"2025-03-14T09:30:12Z"}
{"role":"user","content":"只关注定价，忽略功能对比","ts":"2025-03-14T09:31:02Z"}
{"role":"assistant","content":"明白，聚焦三种定价模型对比...","ts":"2025-03-14T09:31:05Z"}
```

**tab: index.md (L2)**
```markdown
// L2：提炼后的外部摘要，供 Main Session 消费。子 Session 自身看不到这个文件
// ——————————————————————

## 竞品定价分析

### 当前状态
用户正在对比三家竞品的定价模型（按量/按席位/混合）。

### 关键发现
- Acme：席位制 $29/seat，适合中小团队
- Vertex：按量计费，高频用户月均成本低 40%
- Orbit：年付享 8 折，企业版需单独报价

### 待决策
年付折扣策略尚未确认。
```

**tab: memory.md (L1)**
```markdown
// L1：全局认知状态，应用层可直接读写，所有 Session 共享
// ——————————————————————

## 用户画像
职业：产品经理，负责 B2B SaaS 定价策略
风格：偏好数据驱动，结论先行，不要废话

## 跨会话洞察
- 市场分析 × 功能规划存在**定价冲突**：
  按量计费模型与核心功能的高固定成本不兼容
- 技术选型中的 AI 集成成本会显著影响毛利率

## 长期偏好
- 竞品调研优先看定价页和 changelog
- 不信任 G2 评分，偏好 HN/Reddit 真实反馈
```

---

#### 大节点：全局意识整合

**上层：**
- 标题：跨分支洞察，自动发现矛盾
- 描述：Main Session 持续收集所有子 Session 的 L2 摘要，整合为全局视图，发现分支之间的矛盾和依赖，并定向推送洞察。这是跨分支信息传播的唯一通道。

**下层 tab：**

**tab: synthesis.md**
```markdown
// Synthesis：整合所有子 Session 的 L2，形成全局视图
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
→ 通知「功能规划」分支评估 AI 功能的边际成本
```

**tab: insight-push.md**
```markdown
// Insight：基于 synthesis 生成的定向建议，推送给特定子 Session
// ——————————————————————

## Insight → 竞品定价分析

来源：全局 synthesis
优先级：高

### 内容
你目前倾向按量计费，但功能规划分支确认了核心功能包含
高固定成本的 AI 集成。按量计费可能导致低用量用户无法
覆盖成本。建议重新评估混合定价模型。

### 触发条件
功能规划分支更新了 AI 集成成本估算后自动触发
```

---

#### 大节点：对话中零开销

**上层：**
- 标题：记忆提炼不阻塞对话
- 描述：所有记忆提炼都在后台异步执行，对话流程完全无感知。你继续聊，Stello 在背后默默整理记忆。

**下层 tab：**

**tab: consolidation.ts**
```typescript
// Consolidation：对话结束后异步将 L3 提炼为 L2，不阻塞对话
// ——————————————————————

// 每轮对话结束后自动触发，fire-and-forget
session.on('turnComplete', async () => {
  // 异步执行，不阻塞下一轮对话
  void session.consolidate({
    strategy: 'incremental',  // 增量提炼，不重写整个 L2
    maxTokens: 500,           // L2 摘要长度上限
  })
})
```

**tab: integration.ts**
```typescript
// Integration：当子 Session 更新 L2 后，Main Session 重新整合全局视图
// ——————————————————————

// 子 Session 的 L2 更新后，自动触发全局整合
agent.on('consolidationComplete', async ({ sessionId }) => {
  // 重新读取所有 L2，生成最新的 synthesis
  void mainSession.integrate({
    trigger: 'child-updated',
    sourceSession: sessionId,
    generateInsights: true,   // 同时生成定向 insights
  })
})
```

---

#### 大节点：星空图可视化

**上层：**
- 标题：你的认知拓扑，一眼看全
- 描述：整棵认知拓扑渲染为星空节点图。每颗星代表一个思考方向，连线表示关联，节点大小映射对话深度，亮度映射活跃程度。

**下层 tab：**

**tab: node-mapping.ts**
```typescript
// 节点映射：将 Session 的运行时状态实时映射为可视化属性
// ——————————————————————

const nodeStyle = {
  size:       session.messageCount,    // 对话越深，节点越大
  color:      session.category,        // 所属类别决定颜色
  brightness: session.lastActiveAt,    // 最近活跃度映射亮度
  border:     session.hasInsight       // 有未读 insight 时边框高亮
    ? '2px solid #FFD700'
    : 'none',
}
```

**tab: interactions.ts**
```typescript
// 交互：拓扑图不只是展示，也是操作入口
// ——————————————————————

starMap.on('nodeClick', (sessionId) => {
  // 点击节点 → 进入该 Session 对话
  router.push(`/session/${sessionId}`)
})

starMap.on('nodeDrag', (sessionId, position) => {
  // 拖拽调整布局 → 持久化位置
  layout.save(sessionId, position)
})

// 缩放：滚轮查看全局或聚焦局部
starMap.enableZoom({ min: 0.3, max: 3.0 })
```

### 移动端适配

拓扑图降级为横向可滑动的节点条（pill 形态）。大节点为主 pill，点击后展开子节点 pill。卡片区在下方。

---

## 第三屏：产品概览

### 目标

介绍 Stello 的四个包，让开发者理解每个包的职责和适用场景。设计理念融入各包描述中。

### 布局

左侧内容卡片区域 + 右侧拓扑图。（与第二屏左右交叉）

### 右侧：拓扑图

**核心节点：** Stello SDK（蓝色大圆，居中）

**大节点（一级，围绕核心节点，紫色中圆）：**

| 节点名 | 位置方向 |
| --- | --- |
| session | 右上 |
| core | 右下 |
| server | 左下 |
| devtools | 左上 |

**子节点（二级，围绕各自父节点，绿色小圆）：**

| 父节点 | 子节点 |
| --- | --- |
| session | L3 记录、L2 提炼、LLM 适配 |
| core | turn 执行、fork 编排、integration 调度 |
| server | REST API、PostgreSQL、多租户 |
| devtools | 星空图、对话回放、事件监控 |

**装饰节点：** adapter、storage、plugin、runtime、schema、hook

**连线：**
- 核心节点与大节点：实线
- 大节点与子节点：实线
- 大节点之间：虚线
- 装饰节点与就近节点：细虚线

**交互行为：**
- 默认选中"session"，该节点及其子节点高亮，卡片区显示对应内容
- 点击大节点 → 高亮该节点及其子节点，卡片区切换
- 点击子节点 → 高亮该子节点，下层 tab 切换，拓扑图同步高亮
- 非选中节点降低透明度

### 左侧：内容卡片

卡片分为上下两层结构，与第二屏一致：

- **上层（固定区）：** 包名 + 一段描述（融入设计理念）
- **下层（文件预览框）：** 文件 tab 栏，每个 tab 展示核心用法代码

---

#### 大节点：@stello-ai/session

**上层：**
- 标题：对话的基本单元
- 描述：每个 Session 就是一个技能——L3 是技能的内部知识体，L2 是技能对外暴露的 description。文件格式选择 Markdown 而非 JSON，三个 md 文件 + records.jsonl，对 LLM 和人类都自然可读。如果你只需要一个具备记忆能力的单 Session 抽象，从这个包开始。

**下层 tab：**

**tab: create-session.ts**
```typescript
// 创建一个具备三层记忆的 Session
// ——————————————————————

import { createSession } from '@stello-ai/session'

const session = await createSession({
  id: 'pricing-analysis',
  scope: '竞品定价策略分析',
  llm: yourLLMAdapter,
  storage: fileSystemAdapter('./data'),
})

// 发送消息，Session 自动管理 L3 记录
const reply = await session.send('帮我对比三家竞品的定价模型')
```

**tab: consolidate.ts**
```typescript
// L3 → L2：将原始对话提炼为外部摘要
// ——————————————————————

// 对话结束后，异步提炼 L2
await session.consolidate({
  strategy: 'incremental',
  maxTokens: 500,
})

// 产出的 L2 写入 index.md
// 子 Session 自身看不到这个文件——这是设计约束，不是 bug
```

**tab: session-files**
```text
// 每个 Session 目录的文件结构（Markdown 优先）
// ——————————————————————

pricing-analysis/
├── memory.md        # L1 全局认知，应用层可直接读写
├── scope.md         # Session 边界定义，AI 创建时自动生成
├── index.md         # L2 外部摘要，供 Main Session 消费
└── records.jsonl    # L3 原始对话记录，完整保留
```

---

#### 大节点：@stello-ai/core

**上层：**
- 标题：编排引擎
- 描述：负责 Session 树的调度和编排。Main Session 是全局意识层——它只读 L2、不读子 Session 的 L3，子 Session 之间不直接通信，跨分支信息只通过 Main Session 的 insight 传播。这些隔离是刻意的架构约束，不是限制。如果你需要多分支对话 + 全局整合，用这个包。

**下层 tab：**

**tab: create-agent.ts**
```typescript
// 创建一个完整的 Stello Agent
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
const result = await agent.turn('main', '帮我规划一个产品策略')
```

**tab: fork-strategy.ts**
```typescript
// Fork 编排：控制 Session 树的分裂策略
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
})
```

**tab: orchestration.ts**
```typescript
// Turn 执行：带 tool-call loop 的对话循环
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
// result.toolCalls  — 工具调用记录
```

---

#### 大节点：@stello-ai/server

**上层：**
- 标题：可部署的后端
- 描述：将 Stello 从进程内 SDK 升级为可部署的服务。REST + WebSocket 双通道，PostgreSQL 持久化，多租户 Space 隔离。架构完全解耦——不绑定特定 LLM 或前端框架，存储层可插拔。如果你需要生产级部署，用这个包。

**下层 tab：**

**tab: docker-compose.yml**
```yaml
# 一键部署 Stello Server
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
      LLM_API_KEY: ${OPENAI_API_KEY}
    depends_on:
      - db
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

**tab: rest-api.ts**
```typescript
// REST API：创建 Space 和发送消息
// ——————————————————————

// 创建一个隔离的工作空间
const space = await fetch('/api/spaces', {
  method: 'POST',
  body: JSON.stringify({ name: '产品规划项目' }),
})

// 在 Space 中发送消息
const reply = await fetch(`/api/spaces/${spaceId}/turn`, {
  method: 'POST',
  body: JSON.stringify({
    sessionId: 'main',
    message: '帮我规划一个产品策略',
  }),
})
```

**tab: multi-tenant.ts**
```typescript
// 多租户：每个 Space 完全隔离
// ——————————————————————

// AgentPool 懒加载 + 自动回收
const pool = new AgentPool({
  maxAgents: 100,
  idleTimeout: '30m',        // 30 分钟无活动自动回收
  storage: postgresAdapter,  // 所有 Space 共享同一个数据库
})

// 请求进来时按 Space 分发
const agent = await pool.getOrCreate(spaceId)
const result = await agent.turn(sessionId, message)
```

---

#### 大节点：@stello-ai/devtools

**上层：**
- 标题：一行代码接入的调试工具
- 描述：星空拓扑图可视化、对话回放、实时事件监控。Apple Liquid Glass 视觉风格。面向开发阶段，不是生产环境依赖。

**下层 tab：**

**tab: start-devtools.ts**
```typescript
// 一行代码启动 Devtools
// ——————————————————————

import { startDevtools } from '@stello-ai/devtools'

await startDevtools(agent, {
  port: 4800,
  open: true,   // 自动打开浏览器
})

// 浏览器打开 http://localhost:4800
// 看到：星空拓扑图 + 对话面板 + 实时事件流
```

**tab: event-stream.ts**
```typescript
// 事件监控：观察 Agent 运行时的所有事件
// ——————————————————————

agent.on('*', (event) => {
  // turnStart / turnComplete
  // consolidationStart / consolidationComplete
  // integrationStart / integrationComplete
  // sessionCreated / sessionArchived
  // insightPushed

  console.log(`[${event.type}]`, event.sessionId, event.data)
})
```

### 移动端适配

同第二屏：pill 条 + 卡片。

---

## 第四屏：落地场景

### 目标

让开发者理解 Stello 能用在哪些场景。点击大节点切换卡片，子节点为具体案例场景，点击后拓扑图高亮联动。

### 布局

左侧拓扑图 + 右侧内容卡片区域。

### 左侧：拓扑图

**核心节点：** 落地场景（蓝色大圆，居中）

**大节点（一级，围绕核心节点，紫色中圆，可点击切换卡片）：**

| 节点名 | 位置方向 |
| --- | --- |
| 深度咨询 | 右上 |
| 知识探索 | 右下 |
| 体系构建 | 左下 |
| 创意创作 | 左上 |
| 办公协作 | 上方 |

**子节点（二级，围绕各自父节点，绿色小圆，可点击高亮联动）：**

| 父节点 | 子节点（案例场景） |
| --- | --- |
| 深度咨询 | 商业规划、理财规划、健康评估 |
| 知识探索 | 深入学习、论文调研、技术选型 |
| 体系构建 | 课程体系、产品架构、OKR 落地 |
| 创意创作 | 品牌策划、内容矩阵、方案比稿 |
| 办公协作 | 产品构建、跨部门项目、周报汇总 |

**装饰节点：** 分析、研究、规划、设计、协同、报告、决策

**连线：**
- 核心节点与大节点：实线
- 大节点与子节点：实线
- 大节点之间：虚线
- 装饰节点与就近节点：细虚线

**交互行为：**
- 默认选中"深度咨询"，该节点及其子节点高亮，卡片区显示对应内容
- 点击大节点 → 高亮该节点及其子节点，卡片区切换
- 点击子节点 → 高亮该子节点，父节点保持次高亮，卡片内容不变
- 非选中节点降低透明度

### 右侧：纯文字卡片

五张卡片，点击大节点切换。每张卡片为一段连贯的话，串联举例场景、结合方式和优势。

---

#### 深度咨询——多维度分析，互不污染

你在做一个重大决策，需要同时从法务、财务、技术三个角度深入分析。用 Stello，每个维度拆成独立 Session 各自深入，Main Session 自动汇总三个方向的结论，发现维度之间的矛盾——比如法务风险会推翻财务方案。各维度保持专业深度不被其他话题稀释，跨维度矛盾不靠你自己发现，AI 主动告诉你。

---

#### 知识探索——并行探索，自动构建知识地图

你在调研一个新领域，同时要了解技术原理、市场格局、竞品动态。用 Stello，每个研究方向各开一个 Session 独立深挖，认知拓扑自然形成知识结构。几天后回来，从星空图任意节点继续，不需要额外整理，研究过程本身就是知识地图。

---

#### 体系构建——从零搭建，层级清晰

你要搭建一套完整的课程体系、产品架构或知识框架，每个模块之间有层级关系和依赖。用 Stello，顶层目标自动拆分为子模块 Session，每个模块独立推进细节。Main Session 持续监控整体结构的完整性，发现模块之间的缺口和冲突。体系越搭越清晰，不会在细节里迷失全局。

---

#### 创意创作——多方案并行，全局一致

你在做品牌策划，同时探索三个不同的创意方向，最终选一个或融合。用 Stello，每个创意方向各开一个分支并行探索，保留所有可能性。Main Session 跨方案比对，确保核心调性一致。创意不被过早淘汰，发散够充分再收敛，全局一致性有 AI 兜底。

---

#### 办公协作——AI 主动发现跨任务依赖

你手头有五个并行推进的工作任务，分属不同项目，偶尔有交叉依赖。用 Stello，每个任务在独立 Session 推进，上下文完全隔离。Main Session 主动扫描所有任务，发现你没注意到的跨任务依赖和遗漏。切换任务零心智负担，跨任务的盲点 AI 主动推送提醒。

### 重要约束

所有场景描述保持通用性——不出现任何垂直行业的具体品牌、产品名或用户身份。子节点案例场景使用通用术语。

### 移动端适配

同第二屏：pill 条 + 卡片。

---

## 第五屏：CTA

### 目标

收口转化。给用户两个明确动作：试用 Stello / 加入社区。

### 布局

居中排列，自上而下。

### 内容元素

1. **标题**："开始构建你的认知拓扑"
2. **副标题**："开源、免费、Apache-2.0。"
3. **卖点补充**（标题下方，轻量展示）：不绑定 LLM / 存储 / UI，完全解耦架构。从单 Session 到完整拓扑，渐进式采用。
4. **安装命令终端窗口**：
   ```
   $ npm install @stello-ai/core
   ```
   - 右上角一键复制按钮
5. **三按钮**：
   - "快速开始 →"（跳转文档 Getting Started）
   - "在 GitHub 上 Star"（跳转 GitHub 仓库）
   - "联系我们"（跳转联系页或弹出联系方式）
6. **GitHub Star 实时 badge**：动态展示当前 star 数
7. **社区入口**（按钮行下方，视觉权重低一级）：
   - Discord 图标 + 链接
   - 微信群引导（二维码或添加链接）

### 移动端适配

堆叠排列不变，终端窗口宽度自适应。

---

## 全局规范

### 拓扑与卡片交叉布局

拓扑图和卡片区在相邻屏之间左右交替，形成视觉节奏感：

| 屏 | 左侧 | 右侧 |
| --- | --- | --- |
| 第一屏 Hero | 三张卡片 | 拓扑图 |
| 第二屏 核心能力 | 拓扑图 | 代码 tab 卡片 |
| 第三屏 产品概览 | 代码 tab 卡片 | 拓扑图 |
| 第四屏 落地场景 | 拓扑图 | 纯文字卡片 |

### 拓扑节点分类

- **核心节点**：每屏拓扑图的中心，蓝色大圆，最大视觉权重，标注屏幕主题名
- **大节点（一级）**：围绕核心节点分布，紫色中圆，可点击，点击后卡片区切换到对应内容
- **子节点（二级）**：围绕各自父节点分布，绿色小圆，可点击，点击后切换 tab 或子节点内容
- **装饰节点**：散落在拓扑图中，有名字标签但不可点击，无卡片内容。视觉权重最低（更小、颜色更淡或灰色）

### 节点间连线

- 核心节点与大节点：实线
- 大节点与子节点：实线
- 大节点之间：虚线（表示关联但非从属）
- 装饰节点与就近节点：细虚线

### 卡片形式

| 屏 | 卡片形式 | 上层 | 下层 |
| --- | --- | --- | --- |
| 第一屏 Hero | 三张平铺卡片 | — | — |
| 第二屏 核心能力 | 代码 tab 卡片 | 大节点标题 + 描述 | 文件 tab 栏，每个 tab = 一个子节点的代码/文件内容 |
| 第三屏 产品概览 | 代码 tab 卡片 | 包名 + 描述（融入设计理念） | 文件 tab 栏，每个 tab = 核心用法代码 |
| 第四屏 落地场景 | 纯文字卡片 | 大节点标题 + 描述 | 子节点文字描述 |

### 交互行为

**第一屏 Hero（卡片 hover 联动）：**
- 三张卡片平铺展示，hover 卡片时拓扑图中对应节点组高亮
- 鼠标离开卡片恢复默认状态
- 不做节点点击切换

**第二至四屏（节点点击切换）：**
- 默认选中第一个大节点，卡片区显示对应内容
- 点击大节点 → 高亮该节点及其子节点，上层切换到大节点描述，下层显示第一个 tab/子节点
- 点击子节点（或 tab）→ 上层不变，下层切换到对应内容
- 拓扑图与卡片双向联动
- 非选中节点降低透明度
- 装饰节点始终低视觉权重，不响应点击

### 移动端适配

- 第一屏：拓扑图缩小置于卡片上方，hover 联动改为静态展示
- 第二至四屏：拓扑图降级为横向可滑动的节点条（pill 形态），大节点为主 pill，点击后展开子节点 pill，卡片区在下方

### 场景无关原则

首页所有示意图、星空图节点名、场景描述不得出现任何垂直行业的具体示例（如留学、医疗品牌名等）。所有节点名使用通用技术或工作场景术语。

### 内容基底

首页文案以 README 为基底，保持措辞一致。README 中的定位句、核心能力描述、技术术语直接复用，避免官网和 README 出现概念冲突。

### 视觉风格

沿用现有官网的浅色基底 + 星空图配色体系（蓝色核心、紫色一级、绿色二级、灰色装饰）。暗色模式需同步适配。

### ⚠️ 代码示例备注

PRD 中第二屏（核心能力）和第三屏（产品概览）的代码 tab 内容均为 mock 示例，API 命名和参数结构可能与实际实现不一致。研发实现时需对照 `stello-agent/stello` 仓库源码（`packages/core`、`packages/session`、`packages/server`、`packages/devtools`）替换为真实 API 和代码片段。
