// 各内存层的代码示例内容，用于 Screen 3 演示
export const CODE_SNIPPETS = {
  l1: `// L1 — Global Key-Value Store
const result = await engine.get('user_preference')
await engine.set('theme', 'dark')

// Instantly accessible from any session
// Perfect for shared application state`,

  l2: `// L2 — Skill Description (External View)
// Auto-generated after session consolidation

{
  "skill": "Market Analysis",
  "capabilities": ["competitor research", "pricing"],
  "lastUpdated": "2024-01-15T10:30:00Z",
  "confidence": 0.87
}`,

  l3: `// L3 — Raw Conversation History
[
  { role: 'user', content: 'Research our top 3 competitors' },
  { role: 'assistant', content: 'Based on analysis...' },
  { role: 'user', content: 'Focus on pricing models' },
  // Full context — only visible to this session
]`,
} as const
