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
    title: { en: 'DAG centered on Main Session', zh: 'Main Session 为中心的有向无环图' },
    dragHint: { en: '✦ Drag nodes to explore', zh: '✦ 拖拽节点探索' },
  },
  memory: {
    eyebrow: { en: 'HOW MEMORY WORKS', zh: '记忆架构' },
    title: { en: 'Three memory layers,\none intelligent topology', zh: '三层记忆，驱动跨 Session 智能' },
    l1: {
      tag: 'L1',
      name: { en: 'Global State', zh: '全局状态' },
      desc: { en: 'Synthesis · global key-value\nRead/write by app layer · shared', zh: 'Synthesis · 全局键值\n应用层直读写 · 拓扑共享' },
    },
    l2: {
      tag: 'L2',
      name: { en: 'Session Summary', zh: 'Session 摘要' },
      desc: { en: 'External description · only Main Session reads\nNot visible to child session itself', zh: '外部描述 · 仅 Main Session 读取\n子 Session 自身不可见' },
    },
    l3: {
      tag: 'L3',
      name: { en: 'Raw History', zh: '原始历史' },
      desc: { en: 'Full conversation record\nPrivate · only visible to this Session LLM', zh: '完整对话记录\n仅本 Session LLM 可见 · 私有' },
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
