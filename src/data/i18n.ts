// src/data/i18n.ts
export const strings = {
  nav: {
    docs: { en: 'Docs', zh: '文档' },
    examples: { en: 'Examples', zh: '示例' },
    github: { en: 'GitHub', zh: 'GitHub' },
  },
  hero: {
    badge: { en: 'Open-Source Agent SDK', zh: '开源 Agent SDK' },
    line1: { en: 'Brainstorming', zh: '用 Agent' },
    line2: { en: 'With Agents', zh: '发散思维' },
    desc: {
      en: 'One prompt triggers parallel thinking.\nMultiple Agent Sessions branch out, each diving deep.\nMain Session synthesizes insights and drives decisions.',
      zh: '一个 prompt，触发拓扑式并行思考\n多个 Agent Session 同时展开，各自深挖\nMain Session 统合洞察，推动决策。',
    },
    quickStart: { en: '⚡ Quick Start', zh: '⚡ 快速开始' },
    viewGitHub: { en: 'View on GitHub →', zh: '在 GitHub 上查看 →' },
  },
  dag: {
    eyebrow: { en: 'SESSION TOPOLOGY', zh: 'SESSION 拓扑' },
    title: { en: 'Conversations That Branch', zh: '会话可以分支' },
    desc: { en: 'Every sub-session is an independent agent skill. The main session orchestrates across all of them.', zh: '每个子 Session 是独立的 Agent 技能，Main Session 在所有技能之间编排协调。' },
    dragHint: { en: 'Drag nodes to explore', zh: '拖拽节点探索' },
  },
  memory: {
    eyebrow: { en: 'THREE-LAYER MEMORY', zh: '三层记忆模型' },
    title: { en: 'Memory That Scales', zh: '可扩展的记忆系统' },
    desc: { en: 'Three distinct memory layers give agents precisely the right context at the right time.', zh: '三个独立记忆层，让 Agent 在恰当的时机获得恰当的上下文。' },
    l1: {
      tag: 'L1',
      name: { en: 'Global Store', zh: '全局存储' },
      desc: { en: 'Shared key-value state across all sessions', zh: '跨所有 Session 的共享键值状态' },
    },
    l2: {
      tag: 'L2',
      name: { en: 'Skill Description', zh: '技能描述' },
      desc: { en: 'External view of each session\'s capabilities', zh: '每个 Session 能力的外部视图' },
    },
    l3: {
      tag: 'L3',
      name: { en: 'Raw History', zh: '原始历史' },
      desc: { en: 'Full conversation context for the session itself', zh: '供 Session 自身使用的完整对话记录' },
    },
  },
  cta: {
    badge: { en: '✦ Quick Start', zh: '✦ 快速开始' },
    title: { en: 'Ready to Branch?', zh: '准备好分支了吗？' },
    desc: {
      en: 'Add multi-session intelligence to your agent in minutes.\nInstall the SDK, define your sessions, and watch the topology emerge.',
      zh: '几分钟内为你的 Agent 添加多 Session 智能。\n安装 SDK，定义 Session，拓扑自然浮现。',
    },
    quickStart: { en: '⚡ Quick Start', zh: '⚡ 快速开始' },
    docs: { en: 'Documentation', zh: '文档' },
    star: { en: '★ GitHub Star', zh: '★ GitHub Star' },
    pills: {
      ts: { en: 'TypeScript Native', zh: 'TypeScript 原生' },
      llm: { en: 'Zero LLM Overhead', zh: '零 LLM 额外开销' },
      dag: { en: 'Multi-Session DAG', zh: '多 Session DAG' },
      oss: { en: 'Apache-2.0', zh: 'Apache-2.0' },
    },
    footer: {
      en: '© 2025 Stello  ·  Apache-2.0  ·  github.com/stello-agent/stello',
      zh: '© 2025 Stello  ·  Apache-2.0  ·  github.com/stello-agent/stello',
    },
  },
} as const
