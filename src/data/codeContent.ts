// 各内存层的代码示例内容，用于 Screen 3 演示
export const CODE_SNIPPETS = {
  l1: {
    filename: 'global-store.kv',
    code: `// L1 — Global Key-Value Store
// Shared across all sessions in the graph

await memory.set('user_preference', {
  theme:  'dark',
  locale: 'en-US',
  tier:   'pro',
})

const pref = await memory.get('user_preference')
// → { theme: 'dark', locale: 'en-US', tier: 'pro' }

// Instantly readable by any session`,
  },

  l2: {
    filename: 'skill-manifest.json',
    code: `// L2 — Skill Description (external view)
// Auto-generated after session consolidation

{
  "skill": "MarketAnalysis",
  "version": "2.1.0",
  "capabilities": [
    "competitor-research",
    "pricing-models",
    "market-sizing"
  ],
  "lastUpdated": "2025-03-14T09:41:00Z",
  "confidence": 0.92,
  "sessionsRun": 47
}`,
  },

  l3: {
    filename: 'session-history.ts',
    code: `// L3 — Raw Conversation History
// Private — only visible to this session

const history = [
  { role: 'user',      content: 'Research top 3 competitors' },
  { role: 'assistant', content: 'Analyzing Acme, Vertex, Orbit...' },
  { role: 'tool',      name: 'web_search', result: '{ ... }' },
  { role: 'user',      content: 'Focus on pricing only' },
  // Full context preserved for this session
]`,
  },
} as const
