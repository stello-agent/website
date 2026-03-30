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
      { en: 'Turn chats into a living knowledge graph', zh: '把对话，变成认知网络' },
      { en: 'Every branch runs deep, never tangled',    zh: '每条思路，独立深入不串味' },
      { en: 'Context that never gets cut off',          zh: '上下文，永远不会被截断' },
      { en: 'Co-evolve with AI across sessions',        zh: '与 AI，持续共同进化' },
    ],
    desc: {
      en: 'When your thinking starts to branch, Stello automatically structures conversations into a persistent, parallel cognitive topology — nothing gets lost in a scrolling window.',
      zh: '当你的思维开始发散，Stello 自动将对话组织成可并行、可延续的认知拓扑——不再有结构消失在滚动窗口里。',
    },
    features: [
      { en: 'Topics auto-branch — each direction runs in its own isolated Session', zh: '话题自动分裂，每个方向在独立 Session 中深入' },
      { en: 'Main Session synthesizes cross-branch insights and surfaces conflicts',  zh: 'Main Session 跨分支整合洞察，自动发现矛盾' },
      { en: 'Three-layer memory — pick up any conversation exactly where you left off', zh: '三层记忆体系，任意对话随时无缝续上' },
    ],
  },
  brainstorm: {
    eyebrow: { en: 'SESSION TOPOLOGY', zh: 'SESSION 拓扑' },
    title: { en: 'Conversations That Branch', zh: '让思路自由分叉' },
    desc: {
      en: 'When AI detects a fork in your thinking, it spawns a child Session automatically. Each branch runs deep and isolated — no context bleed, no lost threads.',
      zh: '当 AI 察觉到思路出现分叉，自动创建子 Session。每条分支独立深入，互不干扰，不再有上下文污染。',
    },
    cards: [
      {
        title: { en: 'Automatic Topic Branching', zh: '话题自动分裂' },
        desc: {
          en: 'When AI detects a fork in your thinking, it spawns a child Session automatically — each direction runs deep and independent.',
          zh: 'AI 识别分叉时自动创建子 Session，每个方向独立深入，不互相干扰',
        },
      },
      {
        title: { en: 'Parallel, Never Tangled', zh: '并行不串味' },
        desc: {
          en: 'Discuss fundraising and product design at the same time, each with its own uncontaminated context.',
          zh: '融资和产品同时聊，各自保持独立上下文',
        },
      },
      {
        title: { en: 'Cross-Branch Insights', zh: '跨分支洞察' },
        desc: {
          en: 'Main Session notices that your MVP positioning conflicts with your target investor profile — and tells you before you do.',
          zh: 'Main Session 发现"你的 MVP 定位和目标投资人画像存在冲突"，主动推送',
        },
      },
      {
        title: { en: 'Structure That Persists', zh: '结构完整留存' },
        desc: {
          en: 'After two hours of brainstorming, your cognitive topology is saved in full. Pick up exactly where you left off — no cold starts.',
          zh: '两小时头脑风暴后，认知拓扑完整保存，随时继续，不从零开始',
        },
      },
    ],
  },
  useCases: {
    eyebrow: { en: 'USE CASES', zh: '应用场景' },
    title: { en: 'Built for Every Domain', zh: '适配每一个专业领域' },
    desc: {
      en: 'From legal research to code review, each topic explored in its own Session. Main Session synthesizes cross-branch insights into a conclusion that spans all dimensions.',
      zh: '从法律研究到代码审查，每个方向在独立 Session 中深挖。Main Session 将跨分支洞察整合为全局结论。',
    },
    cards: [
      {
        title: { en: 'No Domain Left Behind', zh: '专业不设边界' },
        desc: {
          en: 'Law, medicine, code, study abroad — Stello goes deep in every domain.',
          zh: '法律、医疗、代码、留学，Stello 在每个专业域里都能深入',
        },
      },
      {
        title: { en: 'Multi-Dimensional Synthesis', zh: '多维综合建议' },
        desc: {
          en: 'Each direction explored independently, then synthesized by Main Session into a conclusion that spans all dimensions.',
          zh: '各方向独立深挖，最终 Main Session 整合出跨维度的全局结论',
        },
      },
      {
        title: { en: 'Context That Never Fades', zh: '上下文永不丢失' },
        desc: {
          en: 'Switch topics, come back later — Stello remembers every inference you made together.',
          zh: '换个话题再回来，Stello 记得你们聊过什么、推导过什么',
        },
      },
      {
        title: { en: 'Grows Smarter With You', zh: '越用越懂你' },
        desc: {
          en: 'L2 memory accumulates your preferences and context over time, so every suggestion gets closer to what you actually need.',
          zh: 'L2 记忆持续积累你的偏好与背景，建议越来越贴合你的实际情况',
        },
      },
    ],
  },
  memory: {
    eyebrow: { en: 'MEMORY SYSTEM', zh: '记忆系统' },
    title: { en: 'Memory That Thinks, Not Just Stores', zh: '记忆，不只是存档' },
    desc: {
      en: 'Memory flows automatically between layers. Main Session synthesizes all child Sessions\' L2 into a unified world model.',
      zh: '记忆在层级间自动流动，Main Session 整合所有子 Session 的 L2 生成 synthesis',
    },
    l3: {
      tag: 'L3',
      name: { en: 'Raw Record', zh: '原始记录' },
      desc: {
        en: 'Full conversation transcripts, details, process — preserved entirely, retrievable anytime.',
        zh: '对话全文、细节、过程——完整保留，随时回溯',
      },
    },
    l2: {
      tag: 'L2',
      name: { en: 'Capability Map', zh: '技能描述' },
      desc: {
        en: 'A capability map distilled from your conversations — AI learns what you\'re good at and what you prefer.',
        zh: '从对话中提炼的能力图谱——AI 理解你擅长什么、偏好什么',
      },
    },
    l1: {
      tag: 'L1',
      name: { en: 'Global Cognition', zh: '全局认知' },
      desc: {
        en: 'Synthesized intelligence across all Sessions — the crystallized product of your co-evolution with AI.',
        zh: '跨所有 Session 的综合认知——你与 AI 共同进化的结晶',
      },
    },
  },
  cta: {
    title: { en: 'Start Building Your Cognitive Topology', zh: '开始构建你的认知拓扑' },
    desc: {
      en: 'Open-source, free, Apache-2.0 licensed. Join the community and co-evolve with AI.',
      zh: '开源、免费、Apache-2.0 协议。加入社区，与 AI 共同进化。',
    },
    quickStart: { en: 'Get Started →', zh: '快速开始 →' },
    star: { en: 'Star on GitHub', zh: '在 GitHub 上 Star' },
    footer: {
      en: 'Logo · Documentation · GitHub · npm · Apache-2.0 © Stello Team',
      zh: 'Logo · 文档 · GitHub · npm · Apache-2.0 © Stello Team',
    },
  },
} as const
