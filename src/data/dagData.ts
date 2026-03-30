// DAG 节点和边的静态数据
export interface DagNode {
  id: string
  label: string
  x: number
  y: number
  r: number
  color: string
  nodeType?: 'center' | 'branch' | 'leaf'
}

export interface DagEdge {
  from: string
  to: string
}

// 双语节点类型，用于 BrainstormSection 和 UseCasesSection
export interface BilingualDagNode {
  id: string
  label: { en: string; zh: string }
  x: number
  y: number
  r: number
  color: string
  nodeType?: 'center' | 'branch' | 'leaf'
}

// ── Screen 2: 头脑风暴（我想创业） ────────────────────────────────────────────
// viewBox 760 × 480，中心 (380, 240)

export const BRAINSTORM_BI_NODES: BilingualDagNode[] = [
  // 中心
  { id: 'center',     label: { en: 'I Want to\nStart a Company', zh: '我想创业' },         x: 380, y: 240, r: 44, color: '#4488ff', nodeType: 'center' },
  // 一级分支
  { id: 'market',     label: { en: 'Market Research',  zh: '市场调研' },   x: 155, y:  95, r: 42, color: '#cc88ff', nodeType: 'branch' },
  { id: 'product',    label: { en: 'Product Design',   zh: '产品设计' },   x: 605, y:  95, r: 42, color: '#cc88ff', nodeType: 'branch' },
  { id: 'funding',    label: { en: 'Fundraising',      zh: '融资策略' },   x: 155, y: 385, r: 42, color: '#cc88ff', nodeType: 'branch' },
  { id: 'team',       label: { en: 'Team Building',    zh: '团队搭建' },   x: 605, y: 385, r: 42, color: '#cc88ff', nodeType: 'branch' },
  // 市场调研子节点
  { id: 'interviews', label: { en: 'User Interviews',      zh: '用户访谈' },   x:  42, y:  38, r: 28, color: '#4488ff', nodeType: 'leaf' },
  { id: 'competitor', label: { en: 'Competitor Analysis',  zh: '竞品分析' },   x: 155, y:  18, r: 28, color: '#4488ff', nodeType: 'leaf' },
  { id: 'industry',   label: { en: 'Industry Reports',     zh: '行业报告' },   x: 278, y:  38, r: 28, color: '#4488ff', nodeType: 'leaf' },
  // 产品设计子节点
  { id: 'mvp',        label: { en: 'MVP Scope',            zh: 'MVP 定义' },   x: 482, y:  18, r: 28, color: '#4488ff', nodeType: 'leaf' },
  { id: 'stories',    label: { en: 'User Stories',         zh: '用户故事' },   x: 605, y:  12, r: 28, color: '#4488ff', nodeType: 'leaf' },
  { id: 'prototype',  label: { en: 'Prototyping',          zh: '原型方案' },   x: 718, y:  38, r: 28, color: '#4488ff', nodeType: 'leaf' },
  // 融资策略子节点
  { id: 'investors',  label: { en: 'Investor Profiles',    zh: '投资人画像' }, x:  38, y: 440, r: 28, color: '#4488ff', nodeType: 'leaf' },
  { id: 'pitch',      label: { en: 'Pitch Deck',           zh: '路演材料' },   x: 155, y: 460, r: 28, color: '#4488ff', nodeType: 'leaf' },
  { id: 'valuation',  label: { en: 'Valuation Model',      zh: '估值逻辑' },   x: 278, y: 440, r: 28, color: '#4488ff', nodeType: 'leaf' },
  // 团队搭建子节点
  { id: 'cofounder',  label: { en: 'Co-founder Search',    zh: '联创寻找' },   x: 482, y: 458, r: 28, color: '#4488ff', nodeType: 'leaf' },
  { id: 'equity',     label: { en: 'Equity Structure',     zh: '股权分配' },   x: 605, y: 462, r: 28, color: '#4488ff', nodeType: 'leaf' },
  { id: 'hiring',     label: { en: 'Hiring Plan',          zh: '招聘节奏' },   x: 718, y: 445, r: 28, color: '#4488ff', nodeType: 'leaf' },
]

export const BRAINSTORM_EDGES: DagEdge[] = [
  { from: 'center', to: 'market' },
  { from: 'center', to: 'product' },
  { from: 'center', to: 'funding' },
  { from: 'center', to: 'team' },
  { from: 'market',  to: 'interviews' },
  { from: 'market',  to: 'competitor' },
  { from: 'market',  to: 'industry' },
  { from: 'product', to: 'mvp' },
  { from: 'product', to: 'stories' },
  { from: 'product', to: 'prototype' },
  { from: 'funding', to: 'investors' },
  { from: 'funding', to: 'pitch' },
  { from: 'funding', to: 'valuation' },
  { from: 'team',    to: 'cofounder' },
  { from: 'team',    to: 'equity' },
  { from: 'team',    to: 'hiring' },
]

// ── Screen 3: 应用落地（Stello 五分支） ──────────────────────────────────────
// viewBox 760 × 480，中心 (380, 240)

export const USE_CASES_BI_NODES: BilingualDagNode[] = [
  { id: 'stello',    label: { en: 'Stello',               zh: 'Stello' },      x: 380, y: 240, r: 44, color: '#4488ff', nodeType: 'center' },
  { id: 'tech',      label: { en: 'Tech Architecture',    zh: '技术方案' },    x: 115, y:  85, r: 42, color: '#cc88ff', nodeType: 'branch' },
  { id: 'study',     label: { en: 'Study Abroad',         zh: '留学咨询' },    x: 380, y:  55, r: 42, color: '#cc88ff', nodeType: 'branch' },
  { id: 'legal',     label: { en: 'Legal & Compliance',   zh: '法律合规' },    x: 645, y:  85, r: 42, color: '#cc88ff', nodeType: 'branch' },
  { id: 'invest',    label: { en: 'Investment Research',  zh: '投资研究' },    x: 100, y: 390, r: 42, color: '#cc88ff', nodeType: 'branch' },
  { id: 'learning',  label: { en: 'Learning & Growth',    zh: '学习成长' },    x: 660, y: 390, r: 42, color: '#cc88ff', nodeType: 'branch' },
  // 技术方案子节点
  { id: 'sysdesign', label: { en: 'System Design',        zh: '架构设计' },    x:  22, y:  32, r: 26, color: '#4488ff', nodeType: 'leaf' },
  { id: 'techstack', label: { en: 'Tech Stack',           zh: '技术选型' },    x: 128, y:  15, r: 26, color: '#4488ff', nodeType: 'leaf' },
  // 留学咨询子节点
  { id: 'schools',   label: { en: 'School Selection',     zh: '选校策略' },    x: 288, y:  12, r: 26, color: '#4488ff', nodeType: 'leaf' },
  { id: 'essays',    label: { en: 'Essays',               zh: '文书写作' },    x: 400, y:   8, r: 26, color: '#4488ff', nodeType: 'leaf' },
  // 法律合规子节点
  { id: 'contracts', label: { en: 'Contract Review',      zh: '合同审查' },    x: 638, y:  15, r: 26, color: '#4488ff', nodeType: 'leaf' },
  { id: 'ip',        label: { en: 'IP Protection',        zh: '知识产权' },    x: 735, y:  42, r: 26, color: '#4488ff', nodeType: 'leaf' },
  // 投资研究子节点
  { id: 'sector',    label: { en: 'Sector Analysis',      zh: '行业分析' },    x:  18, y: 348, r: 26, color: '#4488ff', nodeType: 'leaf' },
  { id: 'diligence', label: { en: 'Due Diligence',        zh: '标的调研' },    x:  85, y: 455, r: 26, color: '#4488ff', nodeType: 'leaf' },
  // 学习成长子节点
  { id: 'knowledge', label: { en: 'Knowledge Map',        zh: '知识体系' },    x: 652, y: 455, r: 26, color: '#4488ff', nodeType: 'leaf' },
  { id: 'skillpath', label: { en: 'Skill Path',           zh: '技能路径' },    x: 738, y: 360, r: 26, color: '#4488ff', nodeType: 'leaf' },
]

export const USE_CASES_EDGES: DagEdge[] = [
  { from: 'stello',   to: 'tech' },
  { from: 'stello',   to: 'study' },
  { from: 'stello',   to: 'legal' },
  { from: 'stello',   to: 'invest' },
  { from: 'stello',   to: 'learning' },
  { from: 'tech',     to: 'sysdesign' },
  { from: 'tech',     to: 'techstack' },
  { from: 'study',    to: 'schools' },
  { from: 'study',    to: 'essays' },
  { from: 'legal',    to: 'contracts' },
  { from: 'legal',    to: 'ip' },
  { from: 'invest',   to: 'sector' },
  { from: 'invest',   to: 'diligence' },
  { from: 'learning', to: 'knowledge' },
  { from: 'learning', to: 'skillpath' },
]

// ── 原始 DAG 数据（保留用于向后兼容） ────────────────────────────────────────

export const DAG_NODES: DagNode[] = [
  { id: 'main', label: 'Main', x: 380, y: 80, r: 34, color: '#4488ff' },
  { id: 'market', label: 'Market\nAnalysis', x: 180, y: 220, r: 28, color: '#cc88ff' },
  { id: 'tech', label: 'Tech\nStack', x: 380, y: 220, r: 28, color: '#cc88ff' },
  { id: 'ux', label: 'UX\nResearch', x: 580, y: 220, r: 28, color: '#cc88ff' },
  { id: 'compete', label: 'Competitor', x: 100, y: 360, r: 22, color: '#22ccbb' },
  { id: 'pricing', label: 'Pricing', x: 260, y: 360, r: 22, color: '#22ccbb' },
  { id: 'arch', label: 'Architecture', x: 420, y: 360, r: 22, color: '#22ccbb' },
  { id: 'user', label: 'User\nInterviews', x: 580, y: 360, r: 22, color: '#22ccbb' },
]

export const DAG_EDGES: DagEdge[] = [
  { from: 'main', to: 'market' },
  { from: 'main', to: 'tech' },
  { from: 'main', to: 'ux' },
  { from: 'market', to: 'compete' },
  { from: 'market', to: 'pricing' },
  { from: 'tech', to: 'arch' },
  { from: 'ux', to: 'user' },
]
