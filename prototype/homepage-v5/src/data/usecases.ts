import type { TopologyNode, TopologyEdge } from './hero'

export interface UseCaseItem {
  id: string
  title: string
  subtitle: string
  description: string
  children: string[]
}

export const usecases: UseCaseItem[] = [
  {
    id: 'consulting',
    title: '深度咨询',
    subtitle: '多维度分析，互不污染',
    description:
      '你在做一个重大决策，需要同时从法务、财务、技术三个角度深入分析。用 Stello，每个维度拆成独立 Session 各自深入，Main Session 自动汇总三个方向的结论，发现维度之间的矛盾——比如法务风险会推翻财务方案。各维度保持专业深度不被其他话题稀释，跨维度矛盾不靠你自己发现，AI 主动告诉你。',
    children: ['商业规划', '理财规划', '健康评估'],
  },
  {
    id: 'exploration',
    title: '知识探索',
    subtitle: '并行探索，自动构建知识地图',
    description:
      '你在调研一个新领域，同时要了解技术原理、市场格局、竞品动态。用 Stello，每个研究方向各开一个 Session 独立深挖，认知拓扑自然形成知识结构。几天后回来，从星空图任意节点继续，不需要额外整理，研究过程本身就是知识地图。',
    children: ['深入学习', '论文调研', '技术选型'],
  },
  {
    id: 'system',
    title: '体系构建',
    subtitle: '从零搭建，层级清晰',
    description:
      '你要搭建一套完整的课程体系、产品架构或知识框架，每个模块之间有层级关系和依赖。用 Stello，顶层目标自动拆分为子模块 Session，每个模块独立推进细节。Main Session 持续监控整体结构的完整性，发现模块之间的缺口和冲突。体系越搭越清晰，不会在细节里迷失全局。',
    children: ['课程体系', '产品架构', 'OKR 落地'],
  },
  {
    id: 'creative',
    title: '创意创作',
    subtitle: '多方案并行，全局一致',
    description:
      '你在做品牌策划，同时探索三个不同的创意方向，最终选一个或融合。用 Stello，每个创意方向各开一个分支并行探索，保留所有可能性。Main Session 跨方案比对，确保核心调性一致。创意不被过早淘汰，发散够充分再收敛，全局一致性有 AI 兜底。',
    children: ['品牌策划', '内容矩阵', '方案比稿'],
  },
  {
    id: 'collaboration',
    title: '办公协作',
    subtitle: 'AI 主动发现跨任务依赖',
    description:
      '你手头有五个并行推进的工作任务，分属不同项目，偶尔有交叉依赖。用 Stello，每个任务在独立 Session 推进，上下文完全隔离。Main Session 主动扫描所有任务，发现你没注意到的跨任务依赖和遗漏。切换任务零心智负担，跨任务的盲点 AI 主动推送提醒。',
    children: ['产品构建', '跨部门项目', '周报汇总'],
  },
]

export const usecaseNodes: TopologyNode[] = [
  { id: 'uc-core', label: '落地场景', x: 250, y: 220, type: 'core' },
  // Primary
  { id: 'uc-consult', label: '深度咨询', x: 420, y: 100, type: 'primary', group: 'consulting' },
  { id: 'uc-explore', label: '知识探索', x: 430, y: 340, type: 'primary', group: 'exploration' },
  { id: 'uc-system', label: '体系构建', x: 80, y: 340, type: 'primary', group: 'system' },
  { id: 'uc-creative', label: '创意创作', x: 70, y: 100, type: 'primary', group: 'creative' },
  { id: 'uc-collab', label: '办公协作', x: 250, y: 40, type: 'primary', group: 'collaboration' },
  // Child
  { id: 'uc-c1', label: '商业规划', x: 500, y: 50, type: 'child', group: 'consulting', parentId: 'uc-consult' },
  { id: 'uc-c2', label: '理财规划', x: 530, y: 130, type: 'child', group: 'consulting', parentId: 'uc-consult' },
  { id: 'uc-c3', label: '健康评估', x: 510, y: 200, type: 'child', group: 'consulting', parentId: 'uc-consult' },
  { id: 'uc-e1', label: '深入学习', x: 510, y: 290, type: 'child', group: 'exploration', parentId: 'uc-explore' },
  { id: 'uc-e2', label: '论文调研', x: 530, y: 370, type: 'child', group: 'exploration', parentId: 'uc-explore' },
  { id: 'uc-e3', label: '技术选型', x: 460, y: 430, type: 'child', group: 'exploration', parentId: 'uc-explore' },
  { id: 'uc-s1', label: '课程体系', x: 0, y: 290, type: 'child', group: 'system', parentId: 'uc-system' },
  { id: 'uc-s2', label: '产品架构', x: 0, y: 370, type: 'child', group: 'system', parentId: 'uc-system' },
  { id: 'uc-s3', label: 'OKR 落地', x: 30, y: 430, type: 'child', group: 'system', parentId: 'uc-system' },
  { id: 'uc-cr1', label: '品牌策划', x: 0, y: 50, type: 'child', group: 'creative', parentId: 'uc-creative' },
  { id: 'uc-cr2', label: '内容矩阵', x: 0, y: 130, type: 'child', group: 'creative', parentId: 'uc-creative' },
  { id: 'uc-cr3', label: '方案比稿', x: 20, y: 200, type: 'child', group: 'creative', parentId: 'uc-creative' },
  { id: 'uc-co1', label: '产品构建', x: 150, y: 0, type: 'child', group: 'collaboration', parentId: 'uc-collab' },
  { id: 'uc-co2', label: '跨部门项目', x: 250, y: 0, type: 'child', group: 'collaboration', parentId: 'uc-collab' },
  { id: 'uc-co3', label: '周报汇总', x: 350, y: 0, type: 'child', group: 'collaboration', parentId: 'uc-collab' },
  // Decorative
  { id: 'd-analyze', label: '分析', x: 560, y: 160, type: 'decorative' },
  { id: 'd-research', label: '研究', x: 560, y: 420, type: 'decorative' },
  { id: 'd-plan', label: '规划', x: 350, y: 460, type: 'decorative' },
  { id: 'd-design', label: '设计', x: 150, y: 460, type: 'decorative' },
  { id: 'd-sync', label: '协同', x: 420, y: 0, type: 'decorative' },
  { id: 'd-report', label: '报告', x: 100, y: 0, type: 'decorative' },
  { id: 'd-decision', label: '决策', x: 560, y: 310, type: 'decorative' },
]

export const usecaseEdges: TopologyEdge[] = [
  // Core -> primary
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
  // Primary-primary
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
  { from: 'd-sync', to: 'uc-collab', style: 'thin-dashed' },
  { from: 'd-report', to: 'uc-collab', style: 'thin-dashed' },
  { from: 'd-decision', to: 'uc-explore', style: 'thin-dashed' },
]
