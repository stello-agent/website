// src/data/usecasesData.ts
// Use cases data with interactive topology — ported from prototype with i18n
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
      en: 'Making a major decision across legal, financial, and technical dimensions? Each dimension gets its own Session for deep analysis. Main Session auto-synthesizes conclusions and surfaces cross-dimension conflicts.',
      zh: '你在做一个重大决策，需要同时从法务、财务、技术三个角度深入分析。每个维度拆成独立 Session 各自深入，Main Session 自动汇总三个方向的结论，发现维度之间的矛盾。',
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
      en: 'Researching a new field — tech principles, market landscape, competitor dynamics. Each direction gets its own Session. Come back days later, pick up from any node in the star map.',
      zh: '你在调研一个新领域，同时要了解技术原理、市场格局、竞品动态。每个研究方向各开一个 Session 独立深挖，几天后从星空图任意节点继续。',
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
      en: 'Building a course curriculum, product architecture, or knowledge framework. Top-level goals auto-split into sub-module Sessions. Main Session monitors structural completeness across modules.',
      zh: '你要搭建一套完整的课程体系、产品架构或知识框架。顶层目标自动拆分为子模块 Session，Main Session 持续监控整体结构的完整性。',
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
      en: 'Exploring three different creative directions for brand strategy. Each direction branches independently. Main Session cross-compares to ensure core tone stays consistent.',
      zh: '你在做品牌策划，同时探索三个不同的创意方向。每个方向各开一个分支并行探索，Main Session 跨方案比对，确保核心调性一致。',
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
      en: 'Five parallel tasks across different projects. Each runs in an isolated Session. Main Session scans all tasks, surfacing hidden cross-task dependencies you might have missed.',
      zh: '你手头有五个并行推进的工作任务。每个任务在独立 Session 推进，Main Session 主动扫描所有任务，发现你没注意到的跨任务依赖。',
    },
    children: [
      { en: 'Product Build', zh: '产品构建' },
      { en: 'Cross-Dept Project', zh: '跨部门项目' },
      { en: 'Weekly Report', zh: '周报汇总' },
    ],
  },
]

export const UC_GROUP_COLORS: Record<string, string> = {
  consulting: '#a855f7',
  exploration: '#22c55e',
  system: '#3b82f6',
  creative: '#f59e0b',
  collaboration: '#ec4899',
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
]
