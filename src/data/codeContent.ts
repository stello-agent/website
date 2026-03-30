// 各内存层的代码示例内容，用于 Screen 2 演示
export const CODE_SNIPPETS = {
  l3: {
    filename: 'session.jsonl',
    code: `{"role":"user","content":"帮我分析一下竞品定价策略","ts":"2025-03-14T09:30:00Z"}
{"role":"assistant","content":"好的，我来研究 Acme、Vertex、Orbit 三家...","ts":"2025-03-14T09:30:04Z"}
{"role":"tool","name":"web_search","result":{"hits":42,"top":"acme.io/pricing"},"ts":"2025-03-14T09:30:09Z"}
{"role":"assistant","content":"Acme 席位制 $29/seat，Vertex 按量计费...","ts":"2025-03-14T09:30:15Z"}
{"role":"user","content":"只关注定价，忽略功能对比","ts":"2025-03-14T09:31:02Z"}
{"role":"assistant","content":"明白，聚焦三种定价模型对比...","ts":"2025-03-14T09:31:07Z"}
{"role":"tool","name":"web_search","result":{"hits":18,"top":"vertex.io/pricing"},"ts":"2025-03-14T09:31:12Z"}
{"role":"assistant","content":"Vertex 高频用户月均成本低 40%...","ts":"2025-03-14T09:31:20Z"}
{"role":"user","content":"Orbit 有没有年付折扣？","ts":"2025-03-14T09:32:05Z"}
{"role":"tool","name":"web_search","result":{"hits":6,"top":"orbit.so/enterprise"},"ts":"2025-03-14T09:32:08Z"}
{"role":"assistant","content":"Orbit 年付享 8 折，企业版需单独报价","ts":"2025-03-14T09:32:14Z"}
{"role":"user","content":"好，先到这里，帮我总结一下结论","ts":"2025-03-14T09:33:01Z"}
{"role":"assistant","content":"结论：按量计费最灵活，席位制适合大团队...","ts":"2025-03-14T09:33:08Z"}
{"role":"system","content":"[session consolidated → summary.md]","ts":"2025-03-14T09:33:10Z"}`,
  },

  l2: {
    filename: 'summary.md',
    code: `# Session Summary — 市场分析

**会话目标**：调研竞品定价策略，为产品定价提供参考。

## 关键洞察
- Acme 采用席位制（$29/seat/mo），适合中大型团队
- Vertex 按 API 用量计费，对高频用户更经济
- Orbit 提供免费层 + 企业定制，获客成本低

## 用户偏好
- 倾向 **按用量计费**，不希望固定席位绑定
- 关注定价透明度，反感隐藏费用
## 待深入方向
- [ ] Orbit 企业版报价 / 年付折扣对比`,
  },

  l1: {
    filename: 'global-context.md',
    code: `# Global Cognition

## 用户画像
职业：产品经理，负责 B2B SaaS 定价策略
风格：偏好数据驱动，结论先行，不要废话

## 跨会话洞察
- 市场分析 × 功能规划存在**定价冲突**：
  按量计费模型与核心功能的高固定成本不兼容
- 技术选型中的 AI 集成成本会显著影响毛利率

## 长期偏好
- 竞品调研优先看定价页和 changelog
- 不信任 G2 评分，偏好 HN/Reddit 真实反馈`,
  },
} as const
