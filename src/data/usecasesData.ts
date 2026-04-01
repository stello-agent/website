// src/data/usecasesData.ts
// Screen 4: Use cases with interactive topology — updated per PRD v5
import type { TopologyNode, TopologyEdge } from '../components/TopologyGraph'

export interface UseCaseItem {
  id: string
  title: { en: string; zh: string }
  subtitle: { en: string; zh: string }
  description: { en: string; zh: string }
  children: { en: string; zh: string }[]
}

export const usecases: UseCaseItem[] = [
  {
    id: 'consulting',
    title: { en: 'Deep Consulting', zh: '深度咨询' },
    subtitle: { en: 'Multi-dimensional analysis, zero contamination', zh: '多维度分析，互不污染' },
    description: {
      en: 'Making a major decision that requires simultaneous deep analysis from legal, financial, and technical angles? With Stello, each dimension branches into its own Session for in-depth exploration. Main Session auto-synthesizes conclusions from all three directions and surfaces cross-dimension conflicts — like when legal risks would overturn the financial plan. Each dimension maintains professional depth without dilution from other topics, and cross-dimension conflicts are surfaced by AI proactively.',
      zh: '你在做一个重大决策，需要同时从法务、财务、技术三个角度深入分析。用 Stello，每个维度拆成独立 Session 各自深入，Main Session 自动汇总三个方向的结论，发现维度之间的矛盾——比如法务风险会推翻财务方案。各维度保持专业深度不被其他话题稀释，跨维度矛盾不靠你自己发现，AI 主动告诉你。',
    },
    children: [
      { en: 'Business Planning', zh: '商业规划' },
      { en: 'Financial Planning', zh: '理财规划' },
      { en: 'Health Assessment', zh: '健康评估' },
    ],
  },
  {
    id: 'exploration',
    title: { en: 'Knowledge Exploration', zh: '知识探索' },
    subtitle: { en: 'Parallel exploration, auto-build knowledge maps', zh: '并行探索，自动构建知识地图' },
    description: {
      en: 'Researching a new field — tech principles, market landscape, competitor dynamics all at once. With Stello, each research direction gets its own Session for independent deep diving. The cognitive topology naturally forms a knowledge structure. Come back days later, pick up from any node in the star map — no extra organization needed. The research process itself becomes the knowledge map.',
      zh: '你在调研一个新领域，同时要了解技术原理、市场格局、竞品动态。用 Stello，每个研究方向各开一个 Session 独立深挖，认知拓扑自然形成知识结构。几天后回来，从星空图任意节点继续，不需要额外整理，研究过程本身就是知识地图。',
    },
    children: [
      { en: 'Deep Learning', zh: '深入学习' },
      { en: 'Paper Research', zh: '论文调研' },
      { en: 'Tech Selection', zh: '技术选型' },
    ],
  },
  {
    id: 'system',
    title: { en: 'System Building', zh: '体系构建' },
    subtitle: { en: 'Build from scratch, crystal-clear hierarchy', zh: '从零搭建，层级清晰' },
    description: {
      en: 'Building a complete course curriculum, product architecture, or knowledge framework where modules have hierarchical relationships and dependencies. With Stello, top-level goals auto-split into sub-module Sessions, each advancing its details independently. Main Session continuously monitors overall structural completeness, discovering gaps and conflicts between modules. The more you build, the clearer it gets — never losing the big picture in the details.',
      zh: '你要搭建一套完整的课程体系、产品架构或知识框架，每个模块之间有层级关系和依赖。用 Stello，顶层目标自动拆分为子模块 Session，每个模块独立推进细节。Main Session 持续监控整体结构的完整性，发现模块之间的缺口和冲突。体系越搭越清晰，不会在细节里迷失全局。',
    },
    children: [
      { en: 'Course Design', zh: '课程体系' },
      { en: 'Product Architecture', zh: '产品架构' },
      { en: 'OKR Planning', zh: 'OKR 落地' },
    ],
  },
  {
    id: 'creative',
    title: { en: 'Creative Work', zh: '创意创作' },
    subtitle: { en: 'Parallel concepts, global consistency', zh: '多方案并行，全局一致' },
    description: {
      en: 'Working on brand strategy, exploring three different creative directions simultaneously, planning to pick one or merge them. With Stello, each creative direction branches independently for parallel exploration, preserving all possibilities. Main Session cross-compares across concepts to ensure core tone stays consistent. Ideas aren\'t prematurely discarded, divergence is thorough before convergence, and global consistency is backed by AI.',
      zh: '你在做品牌策划，同时探索三个不同的创意方向，最终选一个或融合。用 Stello，每个创意方向各开一个分支并行探索，保留所有可能性。Main Session 跨方案比对，确保核心调性一致。创意不被过早淘汰，发散够充分再收敛，全局一致性有 AI 兜底。',
    },
    children: [
      { en: 'Brand Strategy', zh: '品牌策划' },
      { en: 'Content Matrix', zh: '内容矩阵' },
      { en: 'Pitch Comparison', zh: '方案比稿' },
    ],
  },
  {
    id: 'collaboration',
    title: { en: 'Work Collaboration', zh: '办公协作' },
    subtitle: { en: 'AI surfaces cross-task dependencies', zh: 'AI 主动发现跨任务依赖' },
    description: {
      en: 'Five parallel tasks across different projects, occasionally with cross-dependencies. With Stello, each task progresses in an isolated Session with fully separated context. Main Session proactively scans all tasks, surfacing hidden cross-task dependencies and blind spots you might have missed. Zero cognitive overhead switching tasks, and cross-task blind spots get AI-pushed reminders.',
      zh: '你手头有五个并行推进的工作任务，分属不同项目，偶尔有交叉依赖。用 Stello，每个任务在独立 Session 推进，上下文完全隔离。Main Session 主动扫描所有任务，发现你没注意到的跨任务依赖和遗漏。切换任务零心智负担，跨任务的盲点 AI 主动推送提醒。',
    },
    children: [
      { en: 'Product Build', zh: '产品构建' },
      { en: 'Cross-Dept Project', zh: '跨部门项目' },
      { en: 'Weekly Report', zh: '周报汇总' },
    ],
  },
]

export const UC_GROUP_COLORS: Record<string, string> = {
  consulting: '#9b7b6b',
  exploration: '#7b9b8b',
  system: '#6b7b8d',
  creative: '#b0956b',
  collaboration: '#8b7b9b',
}

export const usecaseNodes: TopologyNode[] = [
  { id: 'uc-core', label: '落地场景', x: 250, y: 220, type: 'core' },
  // Primary
  { id: 'uc-consult', label: '深度咨询', x: 420, y: 100, type: 'primary', group: 'consulting' },
  { id: 'uc-explore', label: '知识探索', x: 430, y: 340, type: 'primary', group: 'exploration' },
  { id: 'uc-system', label: '体系构建', x: 80, y: 340, type: 'primary', group: 'system' },
  { id: 'uc-creative', label: '创意创作', x: 70, y: 100, type: 'primary', group: 'creative' },
  { id: 'uc-collab', label: '办公协作', x: 250, y: 40, type: 'primary', group: 'collaboration' },
  // Child — consulting
  { id: 'uc-c1', label: '商业规划', x: 500, y: 30, type: 'child', group: 'consulting' },
  { id: 'uc-c2', label: '理财规划', x: 530, y: 130, type: 'child', group: 'consulting' },
  { id: 'uc-c3', label: '健康评估', x: 510, y: 200, type: 'child', group: 'consulting' },
  // Child — exploration
  { id: 'uc-e1', label: '深入学习', x: 510, y: 280, type: 'child', group: 'exploration' },
  { id: 'uc-e2', label: '论文调研', x: 530, y: 370, type: 'child', group: 'exploration' },
  { id: 'uc-e3', label: '技术选型', x: 460, y: 430, type: 'child', group: 'exploration' },
  // Child — system
  { id: 'uc-s1', label: '课程体系', x: 0, y: 290, type: 'child', group: 'system' },
  { id: 'uc-s2', label: '产品架构', x: 0, y: 370, type: 'child', group: 'system' },
  { id: 'uc-s3', label: 'OKR 落地', x: 30, y: 430, type: 'child', group: 'system' },
  // Child — creative
  { id: 'uc-cr1', label: '品牌策划', x: 0, y: 50, type: 'child', group: 'creative' },
  { id: 'uc-cr2', label: '内容矩阵', x: 0, y: 130, type: 'child', group: 'creative' },
  { id: 'uc-cr3', label: '方案比稿', x: 20, y: 200, type: 'child', group: 'creative' },
  // Child — collaboration
  { id: 'uc-co1', label: '产品构建', x: 150, y: 0, type: 'child', group: 'collaboration' },
  { id: 'uc-co2', label: '跨部门项目', x: 250, y: 0, type: 'child', group: 'collaboration' },
  { id: 'uc-co3', label: '周报汇总', x: 350, y: 0, type: 'child', group: 'collaboration' },
  // Decorative
  { id: 'd-analyze', label: '分析', x: 560, y: 160, type: 'decorative' },
  { id: 'd-research', label: '研究', x: 560, y: 420, type: 'decorative' },
  { id: 'd-plan', label: '规划', x: 350, y: 460, type: 'decorative' },
  { id: 'd-design', label: '设计', x: 150, y: 460, type: 'decorative' },
  { id: 'd-collab', label: '协同', x: 420, y: 0, type: 'decorative' },
  { id: 'd-report', label: '报告', x: 80, y: 0, type: 'decorative' },
  { id: 'd-decision', label: '决策', x: 560, y: 300, type: 'decorative' },
]

export const usecaseEdges: TopologyEdge[] = [
  // Core → primary
  { from: 'uc-core', to: 'uc-consult', style: 'solid' },
  { from: 'uc-core', to: 'uc-explore', style: 'solid' },
  { from: 'uc-core', to: 'uc-system', style: 'solid' },
  { from: 'uc-core', to: 'uc-creative', style: 'solid' },
  { from: 'uc-core', to: 'uc-collab', style: 'solid' },
  // Children
  { from: 'uc-consult', to: 'uc-c1', style: 'solid' },
  { from: 'uc-consult', to: 'uc-c2', style: 'solid' },
  { from: 'uc-consult', to: 'uc-c3', style: 'solid' },
  { from: 'uc-explore', to: 'uc-e1', style: 'solid' },
  { from: 'uc-explore', to: 'uc-e2', style: 'solid' },
  { from: 'uc-explore', to: 'uc-e3', style: 'solid' },
  { from: 'uc-system', to: 'uc-s1', style: 'solid' },
  { from: 'uc-system', to: 'uc-s2', style: 'solid' },
  { from: 'uc-system', to: 'uc-s3', style: 'solid' },
  { from: 'uc-creative', to: 'uc-cr1', style: 'solid' },
  { from: 'uc-creative', to: 'uc-cr2', style: 'solid' },
  { from: 'uc-creative', to: 'uc-cr3', style: 'solid' },
  { from: 'uc-collab', to: 'uc-co1', style: 'solid' },
  { from: 'uc-collab', to: 'uc-co2', style: 'solid' },
  { from: 'uc-collab', to: 'uc-co3', style: 'solid' },
  // Primary ↔ primary
  { from: 'uc-consult', to: 'uc-explore', style: 'dashed' },
  { from: 'uc-explore', to: 'uc-system', style: 'dashed' },
  { from: 'uc-system', to: 'uc-creative', style: 'dashed' },
  { from: 'uc-creative', to: 'uc-collab', style: 'dashed' },
  { from: 'uc-collab', to: 'uc-consult', style: 'dashed' },
  // Decorative
  { from: 'd-analyze', to: 'uc-consult', style: 'thin-dashed' },
  { from: 'd-research', to: 'uc-explore', style: 'thin-dashed' },
  { from: 'd-plan', to: 'uc-system', style: 'thin-dashed' },
  { from: 'd-design', to: 'uc-creative', style: 'thin-dashed' },
  { from: 'd-collab', to: 'uc-collab', style: 'thin-dashed' },
  { from: 'd-report', to: 'uc-creative', style: 'thin-dashed' },
  { from: 'd-decision', to: 'uc-explore', style: 'thin-dashed' },
]
