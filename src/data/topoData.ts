// src/data/topoData.ts — 拓扑图 demo 数据（双语 label）

export interface TopoNodeDef {
  id: string
  label: { en: string; zh: string }
  parentId: string | null
  status: 'active' | 'archived'
  turns: number
  children: string[]
  refs: string[]
}

// ── Screen 3：产品头脑风暴 ────────────────────────────
// 模拟一次关于新 AI 产品的自由分叉式讨论
export const BRAINSTORM_TOPO: TopoNodeDef[] = [
  {
    id: 'main',       label: { en: 'Product',      zh: '产品规划'   },
    parentId: null,   status: 'active',   turns: 24,
    children: ['market', 'feature', 'tech'], refs: [],
  },
  {
    id: 'market',     label: { en: 'Market',       zh: '市场分析'   },
    parentId: 'main', status: 'active',   turns: 12,
    children: ['competitor', 'persona'], refs: [],
  },
  {
    id: 'competitor', label: { en: 'Competitors',  zh: '竞品调研'   },
    parentId: 'market', status: 'archived', turns: 7,
    children: [], refs: [],
  },
  {
    id: 'persona',    label: { en: 'Personas',     zh: '用户画像'   },
    parentId: 'market', status: 'active',   turns: 9,
    children: [], refs: ['feature'],
  },
  {
    id: 'feature',    label: { en: 'Features',     zh: '功能规划'   },
    parentId: 'main', status: 'active',   turns: 18,
    children: ['core', 'growth', 'ux'], refs: [],
  },
  {
    id: 'core',       label: { en: 'Core',         zh: '核心功能'   },
    parentId: 'feature', status: 'active',   turns: 14,
    children: [], refs: [],
  },
  {
    id: 'growth',     label: { en: 'Growth',       zh: '增长策略'   },
    parentId: 'feature', status: 'active',   turns: 8,
    children: [], refs: ['market'],
  },
  {
    id: 'ux',         label: { en: 'UX Design',    zh: '交互设计'   },
    parentId: 'feature', status: 'active',   turns: 6,
    children: [], refs: [],
  },
  {
    id: 'tech',       label: { en: 'Tech Stack',   zh: '技术选型'   },
    parentId: 'main', status: 'active',   turns: 10,
    children: ['infra', 'ai'], refs: [],
  },
  {
    id: 'infra',      label: { en: 'Infra',        zh: '基础架构'   },
    parentId: 'tech', status: 'active',   turns: 5,
    children: [], refs: [],
  },
  {
    id: 'ai',         label: { en: 'AI Layer',     zh: 'AI 集成'    },
    parentId: 'tech', status: 'active',   turns: 11,
    children: [], refs: [],
  },
]

// ── Screen 4：留学 / 考研 / 考公 辅导场景 ───────────────
// 模拟一个 AI 升学咨询助手同时服务多个方向的拓扑
export const USE_CASES_TOPO: TopoNodeDef[] = [
  {
    id: 'main',       label: { en: 'AI Advisor',   zh: '咨询助手'   },
    parentId: null,   status: 'active',   turns: 30,
    children: ['abroad', 'grad', 'civil'], refs: [],
  },
  {
    id: 'abroad',     label: { en: 'Study Abroad', zh: '留学规划'   },
    parentId: 'main', status: 'active',   turns: 16,
    children: ['us', 'uk'], refs: [],
  },
  {
    id: 'us',         label: { en: 'US Apply',     zh: '美国申请'   },
    parentId: 'abroad', status: 'active',   turns: 12,
    children: [], refs: ['grad'],
  },
  {
    id: 'uk',         label: { en: 'UK Apply',     zh: '英国申请'   },
    parentId: 'abroad', status: 'active',   turns: 8,
    children: [], refs: [],
  },
  {
    id: 'grad',       label: { en: 'Grad Exam',    zh: '考研辅导'   },
    parentId: 'main', status: 'active',   turns: 20,
    children: ['math', 'politics', 'english'], refs: [],
  },
  {
    id: 'math',       label: { en: 'Mathematics',  zh: '数学专项'   },
    parentId: 'grad', status: 'active',   turns: 15,
    children: [], refs: [],
  },
  {
    id: 'politics',   label: { en: 'Politics',     zh: '政治理论'   },
    parentId: 'grad', status: 'active',   turns: 10,
    children: [], refs: [],
  },
  {
    id: 'english',    label: { en: 'English',      zh: '英语提升'   },
    parentId: 'grad', status: 'archived', turns: 9,
    children: [], refs: [],
  },
  {
    id: 'civil',      label: { en: 'Civil Service', zh: '考公备考'  },
    parentId: 'main', status: 'active',   turns: 14,
    children: ['written', 'interview'], refs: [],
  },
  {
    id: 'written',    label: { en: 'Written',      zh: '笔试策略'   },
    parentId: 'civil', status: 'active',   turns: 11,
    children: [], refs: [],
  },
  {
    id: 'interview',  label: { en: 'Interview',    zh: '面试准备'   },
    parentId: 'civil', status: 'active',   turns: 7,
    children: [], refs: ['abroad'],
  },
]
