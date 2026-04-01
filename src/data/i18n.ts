// src/data/i18n.ts
export const strings = {
  nav: {
    overview: { en: 'Overview', zh: 'Overview' },
    docs: { en: 'Docs', zh: '文档' },
    cases: { en: 'Cases', zh: 'Cases' },
    blog: { en: 'Blog', zh: 'Blog' },
    github: { en: 'GitHub', zh: 'GitHub' },
    getStarted: { en: 'Get Started', zh: '快速开始' },
  },
  hero: {
    badge: { en: 'Graph Agent SDK', zh: '拓扑图智能体 SDK' },
    titleStatic: { en: 'Stello', zh: 'Stello' },
    typewriterPhrases: [
      {
        en: 'Turn conversations into cognitive topology',
        zh: '把对话，变成认知拓扑网络',
      },
      {
        en: 'Understand the world the AI-native way',
        zh: '用 AI Native 的方式认识世界',
      },
      {
        en: "Your thinking is branching out — don't let linear chat limit it!",
        zh: '你的思维正在发散成长！别让线性对话限制了它！',
      },
      {
        en: 'Multi-branch parallel exploration, global awareness auto-synthesis',
        zh: '多分支并行探索，全局意识自动整合',
      },
    ],
    desc: {
      en: 'When your thinking starts to branch, Stello automatically structures conversations into a persistent, parallel cognitive topology — nothing gets lost in a scrolling window.',
      zh: '当你的思维开始发散，Stello 自动将对话组织成可并行、可延续的认知拓扑——不再有结构消失在滚动窗口里。',
    },
  },
  brainstorm: {
    eyebrow: { en: 'SESSION TOPOLOGY', zh: 'SESSION 拓扑' },
    title: { en: 'Conversations That Branch', zh: '让思路自由分叉' },
    desc: {
      en: 'When AI detects a fork in your thinking, it spawns a child Session automatically. Each branch runs deep and isolated — no context bleed, no lost threads.',
      zh: '当 AI 察觉到思路出现分叉，自动创建子 Session。每条分支独立深入，互不干扰，不再有上下文污染。',
    },
  },
  useCases: {
    eyebrow: { en: 'USE CASES', zh: '应用场景' },
    title: { en: 'Built for Every Domain', zh: '适配每一个专业领域' },
    desc: {
      en: 'From legal research to code review, each topic explored in its own Session. Main Session synthesizes cross-branch insights into a conclusion that spans all dimensions.',
      zh: '从法律研究到代码审查，每个方向在独立 Session 中深挖。Main Session 将跨分支洞察整合为全局结论。',
    },
  },
  cta: {
    title: {
      en: 'Start Building Your Cognitive Topology',
      zh: '开始构建你的认知拓扑',
    },
    subtitle: {
      en: 'Open-source, free, Apache-2.0.',
      zh: '开源、免费、Apache-2.0。',
    },
    sellingPoints: {
      en: 'Not bound to any LLM / storage / UI — fully decoupled architecture. From a single Session to a full topology, progressive adoption.',
      zh: '不绑定 LLM / 存储 / UI，完全解耦架构。从单 Session 到完整拓扑，渐进式采用。',
    },
    quickStart: { en: 'Get Started →', zh: '快速开始 →' },
    star: { en: 'Star on GitHub', zh: '在 GitHub 上 Star' },
    contact: { en: 'Contact Us', zh: '联系我们' },
    footer: {
      en: 'Logo · Documentation · GitHub · npm · Apache-2.0 © Stello Team',
      zh: 'Logo · 文档 · GitHub · npm · Apache-2.0 © Stello Team',
    },
  },
} as const
