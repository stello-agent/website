// src/data/i18n.ts
export const strings = {
  nav: {
    docs: { en: 'Docs', zh: '文档' },
    examples: { en: 'Examples', zh: '示例' },
    github: { en: 'GitHub', zh: 'GitHub' },
  },
  hero: {
    badge: { en: 'Open-Source Agent SDK', zh: '开源 Agent SDK' },
    slogans: [
      { line1: { en: 'Brainstorming',    zh: 'Agent 协作' },  line2: { en: 'With Agents',        zh: '集思广益'  } },
      { line1: { en: 'Parallel Thinking', zh: '并行思考'   },  line2: { en: 'Deeper Insights',    zh: '深度探索'  } },
      { line1: { en: 'One Prompt',        zh: '一个 Prompt' }, line2: { en: 'Infinite Branches',  zh: '无限分支'  } },
      { line1: { en: 'Multi-Agent',       zh: '多路展开'   },  line2: { en: 'Converge Smart',     zh: '精准汇聚'  } },
    ],
    desc: {
      en: 'One prompt triggers parallel thinking.\nMultiple Agent Sessions branch out, each diving deep.\nMain Session synthesizes insights and drives decisions.',
      zh: '一个 prompt，触发多路并行思考\n多个 Agent 同时展开，各自深入探索\nMain Session 汇总洞察，推动决策',
    },
    quickStart: { en: '⚡ Quick Start', zh: '⚡ 快速上手' },
    viewGitHub: { en: 'View on GitHub →', zh: 'GitHub 上查看 →' },
  },
  dag: {
    eyebrow: { en: 'SESSION TOPOLOGY', zh: 'SESSION 拓扑' },
    title: { en: 'Conversations That Branch', zh: '让思路自由分叉' },
    desc: { en: 'Every sub-session is an independent agent skill. The main session orchestrates across all of them.', zh: '每个子 Session 独立运行，Main Session 统一调度，汇聚所有结果。' },
    dragHint: { en: 'Drag nodes to explore', zh: '拖动节点探索' },
  },
  memory: {
    eyebrow: { en: 'THREE-LAYER MEMORY', zh: '三层记忆模型' },
    title: { en: 'Memory That Scales', zh: '按需分层的记忆体系' },
    desc: { en: 'Three distinct memory layers give agents precisely the right context at the right time.', zh: '三层记忆各司其职，让每个 Agent 始终拿到刚好够用的上下文。' },
    l1: {
      tag: 'L1',
      name: { en: 'Global Store', zh: '全局存储' },
      desc: { en: 'Shared key-value state across all sessions', zh: '所有 Session 共享的全局键值状态' },
    },
    l2: {
      tag: 'L2',
      name: { en: 'Skill Description', zh: '技能摘要' },
      desc: { en: 'External view of each session\'s capabilities', zh: '对外暴露每个 Session 的能力快照' },
    },
    l3: {
      tag: 'L3',
      name: { en: 'Raw History', zh: '对话历史' },
      desc: { en: 'Full conversation context for the session itself', zh: 'Session 私有的完整上下文记录' },
    },
  },
  cta: {
    badge: { en: '✦ Quick Start', zh: '✦ 快速开始' },
    title: { en: 'Ready to Branch?', zh: '开始构建 Agent 拓扑' },
    desc: {
      en: 'Add multi-session intelligence to your agent in minutes.\nInstall the SDK, define your sessions, and watch the topology emerge.',
      zh: '几分钟接入，无缝扩展 Agent 能力。\n安装 SDK，定义 Session，其余交给 Stello。',
    },
    quickStart: { en: '⚡ Quick Start', zh: '⚡ 快速上手' },
    docs: { en: 'Documentation', zh: '查看文档' },
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
