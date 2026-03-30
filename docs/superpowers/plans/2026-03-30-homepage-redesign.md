# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用 Pencil 设计稿的 4 屏结构替换现有首页——Hero / DAG 拓扑 / 三层记忆 / CTA。

**Architecture:** 在现有 React + Vite + TypeScript 项目上直接改写 App.tsx，拆分出 4 个 Section 组件 + 2 个复杂交互组件（DagCanvas、CardStack+CodeEditor）。双语通过轻量级 Context 实现，不引入外部 i18n 库。DAG 拖拽用原生 Pointer Events + React state，不用 D3。

**Tech Stack:** React 19, TypeScript strict, Vite, CSS Modules（保留现有 index.css base），Vitest + React Testing Library（新增）

---

## File Map

| 路径 | 操作 | 职责 |
|------|------|------|
| `src/App.tsx` | 改写 | 顶层壳：Nav + 4 个 Section，提供 LangContext |
| `src/index.css` | 更新 | 字体引入（Inter + JetBrains Mono）、CSS 变量更新 |
| `src/App.css` | 更新 | 保留 nav/button 样式，新增 section 通用布局 |
| `src/context/LangContext.tsx` | 新建 | EN/ZH Context + Provider |
| `src/hooks/useLang.ts` | 新建 | `{ lang, toggle, t }` hook |
| `src/data/i18n.ts` | 新建 | EN/ZH 字符串表 |
| `src/data/dagData.ts` | 新建 | DAG 节点位置 + 边定义 |
| `src/data/codeContent.ts` | 新建 | L1/L2/L3 代码面板内容 |
| `src/sections/HeroSection.tsx` | 新建 | Screen 1：badge + 标题 + CTA |
| `src/sections/DagSection.tsx` | 新建 | Screen 2：标题 + DagCanvas |
| `src/sections/MemorySection.tsx` | 新建 | Screen 3：CardStack + CodeEditor |
| `src/sections/CtaSection.tsx` | 新建 | Screen 4：安装命令 + 按钮组 + pills |
| `src/components/DagCanvas.tsx` | 新建 | SVG 可拖拽 DAG，Pointer Events |
| `src/components/CardStack.tsx` | 新建 | 三张堆叠卡片，点击切换 active |
| `src/components/CodeEditor.tsx` | 新建 | macOS 标题栏 + tabs + 行号 + 代码 |
| `src/sections/sections.css` | 新建 | 所有 section 的局部样式 |
| `src/test/setup.ts` | 新建 | Vitest + Testing Library 初始化 |

---

## Task 1: 测试环境 + 字体

**Files:**
- Modify: `package.json`
- Create: `src/test/setup.ts`
- Modify: `vite.config.ts`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1.1: 安装测试依赖**

```bash
cd ../stello-website
pnpm add -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 1.2: 配置 Vitest**

修改 `vite.config.ts`，添加 test 配置：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 1.3: 创建 test setup**

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 1.4: 更新 tsconfig.app.json 的 types**

在 `compilerOptions` 中添加：`"types": ["vitest/globals"]`

- [ ] **Step 1.5: 更新 index.html — 添加字体 + meta**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stello — Brainstorming With Agents</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 1.6: 更新 index.css CSS 变量和字体**

保留现有 base reset，更新 `:root`：

```css
:root {
  --bg: #06080f;
  --bg-elevated: #0c1228;
  --bg-card: #080b18;
  --text-strong: #e8f0ff;
  --text-muted: #7a8fa8;
  --text-faint: #445566;
  --accent-blue: #4488ff;
  --accent-purple: #cc88ff;
  --accent-teal: #22ccbb;
  --border-subtle: rgba(255, 255, 255, 0.07);
  --border-medium: rgba(255, 255, 255, 0.12);
  --font-sans: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  color: var(--text-muted);
  background: var(--bg);
  font: 16px/1.6 var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 1.7: 运行 `pnpm dev`，确认页面可访问**

- [ ] **Step 1.8: Commit**

```bash
git add -A
git commit -m "chore(website): 添加测试环境、更新字体和 CSS 变量"
```

---

## Task 2: 双语 Context

**Files:**
- Create: `src/data/i18n.ts`
- Create: `src/context/LangContext.tsx`
- Create: `src/hooks/useLang.ts`
- Create: `src/hooks/useLang.test.ts`

- [ ] **Step 2.1: 写失败测试**

```typescript
// src/hooks/useLang.test.ts
import { renderHook, act } from '@testing-library/react'
import { LangProvider } from '../context/LangContext'
import { useLang } from './useLang'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LangProvider>{children}</LangProvider>
)

test('默认语言为 en', () => {
  const { result } = renderHook(() => useLang(), { wrapper })
  expect(result.current.lang).toBe('en')
})

test('toggle 切换为 zh', () => {
  const { result } = renderHook(() => useLang(), { wrapper })
  act(() => result.current.toggle())
  expect(result.current.lang).toBe('zh')
})

test('t() 根据语言返回对应字符串', () => {
  const { result } = renderHook(() => useLang(), { wrapper })
  expect(result.current.t('hello', '你好')).toBe('hello')
  act(() => result.current.toggle())
  expect(result.current.t('hello', '你好')).toBe('你好')
})
```

- [ ] **Step 2.2: 运行测试确认失败**

```bash
pnpm vitest run src/hooks/useLang.test.ts
```

Expected: FAIL — LangContext not found

- [ ] **Step 2.3: 创建 i18n 数据（暂时空壳，后续各 Section 填充）**

```typescript
// src/data/i18n.ts
export const strings = {
  nav: {
    docs: { en: 'Docs', zh: '文档' },
    examples: { en: 'Examples', zh: '示例' },
    github: { en: 'GitHub', zh: 'GitHub' },
    lang: { en: 'EN | 中文', zh: 'EN | 中文' },
  },
  hero: {
    badge: { en: 'Open-Source Agent SDK', zh: '开源 Agent SDK' },
    line1: { en: 'Brainstorming', zh: '用 Agent' },
    line2: { en: 'With Agents', zh: '发散思维' },
    desc: {
      en: 'One prompt triggers parallel thinking.\nMultiple Agent Sessions branch out, each diving deep.\nMain Session synthesizes insights and drives decisions.',
      zh: '一个 prompt，触发拓扑式并行思考\n多个 Agent Session 同时展开，各自深挖\nMain Session 统合洞察，推动决策。',
    },
    quickStart: { en: '⚡ Quick Start', zh: '⚡ 快速开始' },
    viewGitHub: { en: 'View on GitHub →', zh: '在 GitHub 上查看 →' },
  },
  dag: {
    eyebrow: { en: 'SESSION TOPOLOGY', zh: 'SESSION 拓扑' },
    title: { en: 'DAG centered on Main Session', zh: 'Main Session 为中心的有向无环图' },
    dragHint: { en: '✦ Drag nodes to explore', zh: '✦ 拖拽节点探索' },
    mainLabel: { en: 'Main\nSession', zh: 'Main\nSession' },
  },
  memory: {
    eyebrow: { en: 'HOW MEMORY WORKS', zh: '记忆架构' },
    title: { en: 'Three memory layers,\none intelligent topology', zh: '三层记忆，驱动跨 Session 智能' },
    l1: {
      tag: 'L1',
      name: { en: 'Global State', zh: '全局状态' },
      desc: { en: 'Synthesis · global key-value\nRead/write by app layer · shared', zh: 'Synthesis · 全局键值\n应用层直读写 · 拓扑共享' },
    },
    l2: {
      tag: 'L2',
      name: { en: 'Session Summary', zh: 'Session 摘要' },
      desc: { en: 'External description · only Main Session reads\nNot visible to child session itself', zh: '外部描述 · 仅 Main Session 读取\n子 Session 自身不可见' },
    },
    l3: {
      tag: 'L3',
      name: { en: 'Raw History', zh: '原始历史' },
      desc: { en: 'Full conversation record\nPrivate · only visible to this Session LLM', zh: '完整对话记录\n仅本 Session LLM 可见 · 私有' },
    },
  },
  cta: {
    badge: { en: '✦ Quick Start', zh: '✦ 快速开始' },
    title: { en: 'Ready to Branch?', zh: '准备好分支了吗？' },
    desc: {
      en: 'Add multi-session intelligence to your agent in minutes.\nInstall the SDK, define your sessions, and watch the topology emerge.',
      zh: '几分钟内为你的 Agent 添加多 Session 智能。\n安装 SDK，定义 Session，拓扑自然浮现。',
    },
    quickStart: { en: '⚡ Quick Start', zh: '⚡ 快速开始' },
    docs: { en: 'Documentation', zh: '文档' },
    star: { en: '★ GitHub Star', zh: '★ GitHub Star' },
    pills: {
      ts: { en: 'TypeScript Native', zh: 'TypeScript 原生' },
      llm: { en: 'Zero LLM Overhead', zh: '零 LLM 额外开销' },
      dag: { en: 'Multi-Session DAG', zh: '多 Session DAG' },
      oss: { en: 'Apache-2.0', zh: 'Apache-2.0' },
    },
    footer: {
      en: '© 2025 Stello  ·  Apache-2.0  ·  github.com/stello-agent/stello',
      zh: '© 2025 Stello  ·  Apache-2.0  ·  github.com/stello-agent/stello',
    },
  },
} as const
```

- [ ] **Step 2.4: 创建 LangContext**

```typescript
// src/context/LangContext.tsx
import { createContext, useState, useContext } from 'react'

export type Lang = 'en' | 'zh'

interface LangCtx {
  lang: Lang
  toggle: () => void
}

const LangContext = createContext<LangCtx | null>(null)

// LangProvider 包裹整个应用，提供语言状态。
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggle = () => setLang((l) => (l === 'en' ? 'zh' : 'en'))
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

// useLangContext 供内部使用，保证在 Provider 内。
export function useLangContext(): LangCtx {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLangContext must be used within LangProvider')
  return ctx
}
```

- [ ] **Step 2.5: 创建 useLang hook**

```typescript
// src/hooks/useLang.ts
import { useLangContext } from '../context/LangContext'
import type { Lang } from '../context/LangContext'

export interface UseLang {
  lang: Lang
  toggle: () => void
  // t 返回对应语言的字符串。
  t: (en: string, zh: string) => string
}

// useLang 提供语言状态和翻译工具函数。
export function useLang(): UseLang {
  const { lang, toggle } = useLangContext()
  const t = (en: string, zh: string) => (lang === 'en' ? en : zh)
  return { lang, toggle, t }
}
```

- [ ] **Step 2.6: 运行测试确认通过**

```bash
pnpm vitest run src/hooks/useLang.test.ts
```

Expected: 3 tests PASS

- [ ] **Step 2.7: Commit**

```bash
git add src/context src/hooks src/data/i18n.ts src/test
git commit -m "feat(website): 添加双语 Context 和 useLang hook"
```

---

## Task 3: Nav + App 壳

**Files:**
- Modify: `src/App.tsx` (改写为壳结构)
- Modify: `src/App.css` (更新 nav 样式，保留 button 样式)

- [ ] **Step 3.1: 改写 App.tsx 为壳结构（先用占位 Section）**

```tsx
// src/App.tsx
import { LangProvider } from './context/LangContext'
import { useLang } from './hooks/useLang'
import './index.css'
import './App.css'

const NAV_LINKS = [
  { en: 'Docs', zh: '文档', href: 'https://github.com/stello-agent/stello/tree/main/docs' },
  { en: 'Examples', zh: '示例', href: 'https://github.com/stello-agent/stello/tree/main/examples' },
  { en: 'GitHub', zh: 'GitHub', href: 'https://github.com/stello-agent/stello' },
]

// Nav 顶部导航，含语言切换。
function Nav() {
  const { lang, toggle, t } = useLang()
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Stello home">
        <span className="brand-mark" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="brand-name">Stello</span>
      </a>
      <nav className="topnav" aria-label="Primary">
        {NAV_LINKS.map((item) => (
          <a key={item.en} href={item.href} target="_blank" rel="noreferrer">
            {t(item.en, item.zh)}
          </a>
        ))}
      </nav>
      <button className="lang-toggle" onClick={toggle} aria-label="Toggle language">
        {lang === 'en' ? 'EN | 中文' : 'EN | 中文'}
      </button>
    </header>
  )
}

// 渲染站点首页，4 屏结构。
function AppInner() {
  return (
    <div className="page-shell">
      <Nav />
      <main>
        <div style={{ padding: '200px 0', textAlign: 'center', color: 'white' }}>
          Sections coming...
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}
```

- [ ] **Step 3.2: 更新 App.css — 添加 lang-toggle 按钮样式**

在 `.topnav a:hover` 后面新增：

```css
.lang-toggle {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-medium);
  border-radius: 999px;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 6px 14px;
  transition: color 180ms ease, border-color 180ms ease;
  white-space: nowrap;
}

.lang-toggle:hover {
  color: var(--text-strong);
  border-color: var(--border-medium);
}
```

- [ ] **Step 3.3: 确认 `pnpm dev` 正常渲染 Nav**

- [ ] **Step 3.4: Commit**

```bash
git add src/App.tsx src/App.css
git commit -m "feat(website): 重建 App 壳结构和双语 Nav"
```

---

## Task 4: Hero Section（Screen 1）

**Files:**
- Create: `src/sections/HeroSection.tsx`
- Create: `src/sections/sections.css`

- [ ] **Step 4.1: 创建 sections.css（Hero 样式）**

```css
/* src/sections/sections.css */

/* ── Hero ───────────────────────────── */
.hero-section {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 24px 80px;
  gap: 20px;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 40% 30%, rgba(68, 136, 255, 0.14), transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(204, 136, 255, 0.10), transparent 36%);
  pointer-events: none;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-radius: 999px;
  border: 1px solid rgba(68, 136, 255, 0.28);
  background: rgba(10, 20, 40, 0.8);
  color: #7aadff;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #4488ff;
}

.hero-h1 {
  font-size: clamp(3.6rem, 9vw, 7.2rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--text-strong);
  font-family: var(--font-sans);
  margin: 0;
}

.hero-h1-accent {
  color: var(--accent-purple);
}

.hero-desc {
  max-width: 42ch;
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.75;
  white-space: pre-line;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
}
```

- [ ] **Step 4.2: 创建 HeroSection.tsx**

```tsx
// src/sections/HeroSection.tsx
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import './sections.css'

// HeroSection 渲染 Screen 1：badge + 双行大标题 + 描述 + CTA。
export function HeroSection() {
  const { t } = useLang()
  const s = strings.hero

  return (
    <section className="hero-section">
      <span className="hero-badge">
        <span className="hero-badge-dot" aria-hidden="true" />
        {t(s.badge.en, s.badge.zh)}
      </span>

      <h1 className="hero-h1">
        {t(s.line1.en, s.line1.zh)}
        <br />
        <span className="hero-h1-accent">{t(s.line2.en, s.line2.zh)}</span>
      </h1>

      <p className="hero-desc">{t(s.desc.en, s.desc.zh)}</p>

      <div className="hero-actions">
        <a
          className="button button-primary"
          href="https://github.com/stello-agent/stello/tree/main/docs"
          target="_blank"
          rel="noreferrer"
        >
          {t(s.quickStart.en, s.quickStart.zh)}
        </a>
        <a
          className="button button-secondary"
          href="https://github.com/stello-agent/stello"
          target="_blank"
          rel="noreferrer"
        >
          {t(s.viewGitHub.en, s.viewGitHub.zh)}
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4.3: 把 HeroSection 插入 App.tsx**

替换 `<main>` 里的占位内容：

```tsx
import { HeroSection } from './sections/HeroSection'
// ...
<main>
  <HeroSection />
</main>
```

- [ ] **Step 4.4: `pnpm dev`，确认 Hero 渲染正确，语言切换生效**

- [ ] **Step 4.5: Commit**

```bash
git add src/sections
git commit -m "feat(website): 添加 Hero Section（Screen 1）"
```

---

## Task 5: DAG 数据 + 可拖拽 Canvas（Screen 2）

**Files:**
- Create: `src/data/dagData.ts`
- Create: `src/components/DagCanvas.tsx`
- Create: `src/components/DagCanvas.test.tsx`
- Create: `src/sections/DagSection.tsx`

- [ ] **Step 5.1: 创建 dagData.ts**

```typescript
// src/data/dagData.ts

export interface DagNode {
  id: string
  label: string
  x: number
  y: number
  r: number          // 半径（圆形节点）
  color: string
  isMain?: boolean
  isDagNode?: boolean  // 标记双父节点
}

export interface DagEdge {
  id: string
  from: string
  to: string
  style?: 'fork' | 'l2'  // fork=实线, l2=虚线
}

// DAG 初始节点布局，坐标以 1440×720 画布为基准。
export const INITIAL_NODES: DagNode[] = [
  { id: 'main',  label: 'Main\nSession', x: 720, y: 300, r: 40, color: '#1133cc', isMain: true },
  { id: 's1',    label: 'market\nresearch',  x: 200, y: 155, r: 26, color: '#118866' },
  { id: 's2',    label: 'product\ndesign',   x: 654, y: 75,  r: 26, color: '#6622bb' },
  { id: 's3',    label: 'tech\nfeasibility', x: 1140, y: 155, r: 26, color: '#cc5500' },
  { id: 's4',    label: 'risk\nanalysis',    x: 90,  y: 420, r: 23, color: '#cc2244' },
  { id: 's5',    label: 'competitive',       x: 1248, y: 420, r: 23, color: '#116655' },
  { id: 's6',    label: 'prototype',         x: 680, y: 570, r: 26, color: '#cc9900', isDagNode: true },
]

export const DAG_EDGES: DagEdge[] = [
  { id: 'e-main-s1', from: 'main', to: 's1', style: 'fork' },
  { id: 'e-main-s2', from: 'main', to: 's2', style: 'fork' },
  { id: 'e-main-s3', from: 'main', to: 's3', style: 'fork' },
  { id: 'e-s1-s4',   from: 's1',  to: 's4', style: 'fork' },
  { id: 'e-s3-s5',   from: 's3',  to: 's5', style: 'fork' },
  { id: 'e-s4-s6',   from: 's4',  to: 's6', style: 'fork' },
  { id: 'e-s2-s6',   from: 's2',  to: 's6', style: 'fork' },
  { id: 'l2-s1',     from: 's1',  to: 'main', style: 'l2' },
  { id: 'l2-s3',     from: 's3',  to: 'main', style: 'l2' },
]
```

- [ ] **Step 5.2: 写失败测试（拖拽状态）**

```tsx
// src/components/DagCanvas.test.tsx
import { render, screen } from '@testing-library/react'
import { DagCanvas } from './DagCanvas'

test('渲染所有节点标签', () => {
  render(<DagCanvas />)
  expect(screen.getByText(/Main/i)).toBeInTheDocument()
  expect(screen.getByText(/market/i)).toBeInTheDocument()
})

test('拖拽提示文字可见', () => {
  render(<DagCanvas />)
  expect(screen.getByText(/drag/i)).toBeInTheDocument()
})
```

- [ ] **Step 5.3: 运行确认失败**

```bash
pnpm vitest run src/components/DagCanvas.test.tsx
```

- [ ] **Step 5.4: 创建 DagCanvas.tsx**

```tsx
// src/components/DagCanvas.tsx
import { useState, useCallback, useRef } from 'react'
import { INITIAL_NODES, DAG_EDGES, type DagNode } from '../data/dagData'
import { useLang } from '../hooks/useLang'

type NodePositions = Record<string, { x: number; y: number }>

interface DragState {
  nodeId: string
  startX: number
  startY: number
  originX: number
  originY: number
}

// DagCanvas 渲染可拖拽 SVG DAG 图，用 Pointer Events 实现拖拽。
export function DagCanvas() {
  const { t } = useLang()
  const [positions, setPositions] = useState<NodePositions>(() =>
    Object.fromEntries(INITIAL_NODES.map((n) => [n.id, { x: n.x, y: n.y }]))
  )
  const dragRef = useRef<DragState | null>(null)

  const getNodePos = (id: string) => positions[id] ?? { x: 0, y: 0 }

  // onPointerDown 开始拖拽某个节点。
  const onPointerDown = useCallback((e: React.PointerEvent, nodeId: string) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    const pos = getNodePos(nodeId)
    dragRef.current = {
      nodeId,
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
    }
  }, [positions])

  // onPointerMove 更新拖拽中节点的位置。
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return
    const { nodeId, startX, startY, originX, originY } = dragRef.current
    setPositions((prev) => ({
      ...prev,
      [nodeId]: {
        x: originX + (e.clientX - startX),
        y: originY + (e.clientY - startY),
      },
    }))
  }, [])

  const onPointerUp = useCallback(() => {
    dragRef.current = null
  }, [])

  const node = INITIAL_NODES.find((n) => n.id === 'main')!
  const mainPos = getNodePos('main')

  return (
    <svg
      viewBox="0 0 1440 720"
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'default' }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* 边 */}
      {DAG_EDGES.map((edge) => {
        const from = getNodePos(edge.from)
        const to = getNodePos(edge.to)
        return (
          <line
            key={edge.id}
            x1={from.x} y1={from.y}
            x2={to.x} y2={to.y}
            stroke={edge.style === 'l2' ? 'rgba(34,204,187,0.35)' : 'rgba(68,136,238,0.4)'}
            strokeWidth={edge.style === 'l2' ? 1 : 1.5}
            strokeDasharray={edge.style === 'l2' ? '5 4' : undefined}
          />
        )
      })}

      {/* 节点 */}
      {INITIAL_NODES.map((n) => {
        const pos = getNodePos(n.id)
        return (
          <g
            key={n.id}
            transform={`translate(${pos.x},${pos.y})`}
            style={{ cursor: 'grab', userSelect: 'none' }}
            onPointerDown={(e) => onPointerDown(e, n.id)}
          >
            {/* 外光晕 */}
            <circle r={n.r + 10} fill={n.color} opacity={0.12} />
            {/* 主圆 */}
            <circle
              r={n.r}
              fill={n.color}
              stroke={n.isDagNode ? 'rgba(255,210,60,0.7)' : 'rgba(255,255,255,0.15)'}
              strokeWidth={n.isDagNode ? 2 : 1}
              strokeDasharray={n.isDagNode ? '5 3' : undefined}
            />
            {/* 标签 */}
            {n.label.split('\n').map((line, i, arr) => (
              <text
                key={i}
                y={(i - (arr.length - 1) / 2) * 14}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize={n.isMain ? 11 : 9}
                fontFamily="Inter, sans-serif"
                fontWeight={n.isMain ? '700' : '500'}
                style={{ pointerEvents: 'none' }}
              >
                {line}
              </text>
            ))}
          </g>
        )
      })}

      {/* Synthesis 卡片 */}
      <g transform={`translate(${mainPos.x - 154}, ${mainPos.y + 60})`}>
        <rect width={148} height={64} rx={8} fill="rgba(68,136,255,0.08)" stroke="rgba(68,136,255,0.2)" strokeWidth={1} />
        <text x={10} y={20} fill="rgba(100,155,255,0.8)" fontSize={9} fontFamily="Inter" fontWeight="600" letterSpacing="2">SYNTHESIS</text>
        <text x={10} y={38} fill="rgba(200,216,255,0.7)" fontSize={9} fontFamily="Inter">Main Session integrates</text>
        <text x={10} y={52} fill="rgba(200,216,255,0.5)" fontSize={9} fontFamily="Inter">all L2 summaries</text>
      </g>

      {/* 拖拽提示 */}
      <g transform="translate(598, 670)">
        <rect width={160} height={28} rx={14} fill="rgba(255,255,255,0.05)" />
        <text x={80} y={14} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.45)" fontSize={11} fontFamily="Inter">
          {t('✦ Drag nodes to explore', '✦ 拖拽节点探索')}
        </text>
      </g>
    </svg>
  )
}
```

- [ ] **Step 5.5: 运行测试确认通过**

```bash
pnpm vitest run src/components/DagCanvas.test.tsx
```

Expected: 2 tests PASS

- [ ] **Step 5.6: 创建 DagSection.tsx，添加到 sections.css**

在 `sections.css` 末尾新增：

```css
/* ── DAG Section ─────────────────────── */
.dag-section {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: var(--bg);
}

.dag-section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 40px 24px 20px;
  text-align: center;
}

.dag-eyebrow {
  color: rgba(100, 155, 255, 0.6);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.dag-title {
  color: rgba(180, 200, 255, 0.6);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.dag-canvas-wrap {
  flex: 1;
  min-height: 560px;
}
```

创建 `src/sections/DagSection.tsx`：

```tsx
// src/sections/DagSection.tsx
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import { DagCanvas } from '../components/DagCanvas'
import './sections.css'

// DagSection 渲染 Screen 2：全屏可拖拽 DAG 拓扑图。
export function DagSection() {
  const { t } = useLang()
  const s = strings.dag
  return (
    <section className="dag-section">
      <div className="dag-section-header">
        <span className="dag-eyebrow">{t(s.eyebrow.en, s.eyebrow.zh)}</span>
        <span className="dag-title">{t(s.title.en, s.title.zh)}</span>
      </div>
      <div className="dag-canvas-wrap">
        <DagCanvas />
      </div>
    </section>
  )
}
```

- [ ] **Step 5.7: 把 DagSection 加入 App.tsx**

```tsx
import { DagSection } from './sections/DagSection'
// ...
<main>
  <HeroSection />
  <DagSection />
</main>
```

- [ ] **Step 5.8: `pnpm dev`，确认 DAG 渲染可见、节点可拖拽**

- [ ] **Step 5.9: Commit**

```bash
git add src/data/dagData.ts src/components/DagCanvas.tsx src/sections/DagSection.tsx
git commit -m "feat(website): 添加可拖拽 DAG 拓扑图（Screen 2）"
```

---

## Task 6: Memory Layers Section（Screen 3）

**Files:**
- Create: `src/data/codeContent.ts`
- Create: `src/components/CardStack.tsx`
- Create: `src/components/CardStack.test.tsx`
- Create: `src/components/CodeEditor.tsx`
- Create: `src/sections/MemorySection.tsx`

- [ ] **Step 6.1: 创建 codeContent.ts**

```typescript
// src/data/codeContent.ts

export type MemoryLayer = 'l1' | 'l2' | 'l3'

// 每层记忆对应的代码编辑器文件名和内容。
export const CODE_TABS: Record<MemoryLayer, { filename: string; content: string }> = {
  l3: {
    filename: 'raw_history.json',
    content: `[
  {
    "role": "user",
    "content": "analyze this codebase",
    "ts": "2024-01-15T10:23:41Z"
  },
  {
    "role": "assistant",
    "content": "I'll start by exploring...",
    "ts": "2024-01-15T10:23:45Z",
    "tokens": 842
  }
]`,
  },
  l2: {
    filename: 'summary.md',
    content: `## Session Summary

**Focus:** Codebase analysis
**Status:** In progress

### Key Findings
- Monorepo with 4 packages
- TypeScript strict mode throughout
- Session layer is storage-agnostic

### Insights Received
- Prioritize SessionStorage interface
- Check fork() implementation`,
  },
  l1: {
    filename: 'synthesis.json',
    content: `{
  "synthesis": "Three sessions active. Market research complete. Tech feasibility 60% done.",
  "insights": {
    "s1": "Pivot focus to B2B use cases",
    "s2": "Prototype should target v0.3 API",
    "s3": "Flag compliance risk in auth layer"
  },
  "global": {
    "project": "stello-v2",
    "phase": "discovery"
  }
}`,
  },
}
```

- [ ] **Step 6.2: 写 CardStack 失败测试**

```tsx
// src/components/CardStack.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { CardStack } from './CardStack'

test('默认激活 L3 卡片', () => {
  const onChange = vi.fn()
  render(<CardStack active="l3" onChange={onChange} />)
  expect(screen.getByText(/Raw History/i)).toBeInTheDocument()
})

test('点击 L1 卡片触发 onChange', () => {
  const onChange = vi.fn()
  render(<CardStack active="l3" onChange={onChange} />)
  fireEvent.click(screen.getByText(/Global State/i))
  expect(onChange).toHaveBeenCalledWith('l1')
})
```

- [ ] **Step 6.3: 运行确认失败**

```bash
pnpm vitest run src/components/CardStack.test.tsx
```

- [ ] **Step 6.4: 创建 CardStack.tsx**

```tsx
// src/components/CardStack.tsx
import type { MemoryLayer } from '../data/codeContent'
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'

interface CardConfig {
  id: MemoryLayer
  tag: string
  tagColor: string
  borderColor: string
  bg: string
  offsetX: number
  offsetY: number
}

const CARDS: CardConfig[] = [
  { id: 'l1', tag: 'L1', tagColor: '#22ddcc', borderColor: '#22ccbb44', bg: '#0d1f1e', offsetX: 40, offsetY: 0 },
  { id: 'l2', tag: 'L2', tagColor: '#cc88ff', borderColor: '#aa66ee44', bg: '#130e1f', offsetX: 20, offsetY: 22 },
  { id: 'l3', tag: 'L3', tagColor: '#88aaff', borderColor: '#4488ff66', bg: '#0c1228', offsetX: 0,  offsetY: 44 },
]

interface Props {
  active: MemoryLayer
  onChange: (layer: MemoryLayer) => void
}

// CardStack 渲染三张堆叠的记忆层卡片，点击切换激活层。
export function CardStack({ active, onChange }: Props) {
  const { t } = useLang()
  const s = strings.memory

  const layerStrings = { l1: s.l1, l2: s.l2, l3: s.l3 }

  return (
    <div style={{ position: 'relative', width: 300, height: 280 }}>
      {CARDS.map((card) => {
        const ls = layerStrings[card.id]
        const isActive = active === card.id
        return (
          <div
            key={card.id}
            onClick={() => onChange(card.id)}
            style={{
              position: 'absolute',
              left: card.offsetX,
              top: card.offsetY,
              width: 260,
              height: 160,
              background: card.bg,
              border: `1px solid ${card.borderColor}`,
              boxShadow: isActive ? `0 0 20px ${card.borderColor}` : undefined,
              borderRadius: 12,
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              cursor: 'pointer',
              transition: 'box-shadow 200ms ease, transform 200ms ease',
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <span style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              padding: '2px 8px',
              borderRadius: 5,
              background: `${card.tagColor}22`,
              color: card.tagColor,
              fontSize: 10,
              fontWeight: 800,
              fontFamily: 'Inter',
              letterSpacing: 1,
            }}>
              {card.tag}
            </span>
            <strong style={{ color: '#d8e4ff', fontFamily: 'Inter', fontSize: 14, fontWeight: 700 }}>
              {t(ls.name.en, ls.name.zh)}
            </strong>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter', fontSize: 11, lineHeight: 1.65, whiteSpace: 'pre-line' }}>
              {t(ls.desc.en, ls.desc.zh)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 6.5: 运行测试确认通过**

```bash
pnpm vitest run src/components/CardStack.test.tsx
```

Expected: 2 tests PASS

- [ ] **Step 6.6: 创建 CodeEditor.tsx**

```tsx
// src/components/CodeEditor.tsx
import type { MemoryLayer } from '../data/codeContent'
import { CODE_TABS } from '../data/codeContent'

const TABS: { id: MemoryLayer; color: string }[] = [
  { id: 'l3', color: '#4488ff' },
  { id: 'l2', color: '#cc88ff' },
  { id: 'l1', color: '#22ccbb' },
]

interface Props {
  active: MemoryLayer
  onTabChange: (layer: MemoryLayer) => void
}

// CodeEditor 渲染代码编辑器面板，含 macOS 标题栏、tabs、行号和代码内容。
export function CodeEditor({ active, onTabChange }: Props) {
  const { filename, content } = CODE_TABS[active]
  const lines = content.split('\n')

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: '#080b18',
      border: '1px solid #1a2540',
      borderRadius: 12,
      overflow: 'hidden',
      minWidth: 0,
    }}>
      {/* 标题栏 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 42,
        padding: '0 16px',
        background: '#0c0f1d',
        borderBottom: '1px solid #1a2540',
      }}>
        {/* macOS 红绿灯 */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {TABS.map(({ id, color }) => {
            const isActive = id === active
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                style={{
                  background: isActive ? '#101530' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? `2px solid ${color}` : '2px solid transparent',
                  color: isActive ? '#c8d8ff' : '#445566',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  padding: '0 14px',
                  height: 42,
                  transition: 'color 150ms ease',
                }}
              >
                {CODE_TABS[id].filename}
              </button>
            )
          })}
        </div>
      </div>

      {/* 编辑器主体 */}
      <div style={{ display: 'flex', flex: 1, overflow: 'auto' }}>
        {/* 行号 */}
        <div style={{
          width: 44,
          background: '#060911',
          padding: '16px 8px 16px 0',
          textAlign: 'right',
          color: '#2a3a4a',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          lineHeight: 1.75,
          userSelect: 'none',
          flexShrink: 0,
        }}>
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* 代码 */}
        <pre style={{
          margin: 0,
          padding: '16px 20px',
          color: '#7a9cc0',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12,
          lineHeight: 1.75,
          overflow: 'auto',
          flex: 1,
        }}>
          {content}
        </pre>
      </div>
    </div>
  )
}
```

- [ ] **Step 6.7: 创建 MemorySection.tsx，sections.css 补充样式**

`sections.css` 末尾新增：

```css
/* ── Memory Section ─────────────────── */
.memory-section {
  padding: 80px 64px;
  background: #07091c;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.memory-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.memory-eyebrow {
  color: rgba(100, 155, 255, 0.55);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.memory-title {
  color: #d4dcff;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.memory-body {
  display: flex;
  gap: 56px;
  align-items: flex-start;
}

@media (max-width: 900px) {
  .memory-section { padding: 60px 24px; }
  .memory-body { flex-direction: column; }
}
```

创建 `src/sections/MemorySection.tsx`：

```tsx
// src/sections/MemorySection.tsx
import { useState } from 'react'
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import { CardStack } from '../components/CardStack'
import { CodeEditor } from '../components/CodeEditor'
import type { MemoryLayer } from '../data/codeContent'
import './sections.css'

// MemorySection 渲染 Screen 3：三层记忆模型展示。
export function MemorySection() {
  const { t } = useLang()
  const s = strings.memory
  const [active, setActive] = useState<MemoryLayer>('l3')

  return (
    <section className="memory-section">
      <div className="memory-header">
        <span className="memory-eyebrow">{t(s.eyebrow.en, s.eyebrow.zh)}</span>
        <h2 className="memory-title">{t(s.title.en, s.title.zh)}</h2>
      </div>
      <div className="memory-body">
        <CardStack active={active} onChange={setActive} />
        <CodeEditor active={active} onTabChange={setActive} />
      </div>
    </section>
  )
}
```

- [ ] **Step 6.8: 把 MemorySection 加入 App.tsx**

```tsx
import { MemorySection } from './sections/MemorySection'
// ...
<HeroSection />
<DagSection />
<MemorySection />
```

- [ ] **Step 6.9: `pnpm dev`，确认卡片点击切换代码内容、Tab 切换同步**

- [ ] **Step 6.10: Commit**

```bash
git add src/data/codeContent.ts src/components/CardStack.tsx src/components/CodeEditor.tsx src/sections/MemorySection.tsx
git commit -m "feat(website): 添加三层记忆 Section（Screen 3）"
```

---

## Task 7: CTA Section（Screen 4）

**Files:**
- Create: `src/sections/CtaSection.tsx`

- [ ] **Step 7.1: sections.css 补充 CTA 样式**

```css
/* ── CTA Section ─────────────────────── */
.cta-section-new {
  background: #050810;
  padding: 100px 24px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;
}

.cta-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 640px;
  width: 100%;
}

.cta-badge {
  display: inline-flex;
  padding: 5px 14px;
  border-radius: 999px;
  border: 1px solid rgba(68, 136, 255, 0.26);
  background: rgba(10, 20, 40, 0.8);
  color: #7aadff;
  font-size: 0.8rem;
  font-weight: 600;
}

.cta-title {
  font-size: clamp(2.2rem, 6vw, 3.4rem);
  font-weight: 900;
  color: var(--text-strong);
  letter-spacing: -0.04em;
  line-height: 1;
  margin: 0;
}

.cta-desc {
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.7;
  white-space: pre-line;
}

.install-box {
  width: 100%;
  background: #090e1c;
  border: 1px solid #1e2a40;
  border-radius: 10px;
  overflow: hidden;
}

.install-titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 14px;
  background: #0c1020;
  border-radius: 10px 10px 0 0;
}

.install-titlebar-label {
  margin-left: 8px;
  color: #3a4a5a;
  font-family: var(--font-mono);
  font-size: 11px;
}

.install-cmd {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
}

.install-prompt {
  color: #4488ff;
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
}

.install-text {
  color: #c8d8ff;
  font-family: var(--font-mono);
  font-size: 14px;
  user-select: all;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.cta-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.cta-pill {
  padding: 7px 16px;
  border-radius: 999px;
  border: 1px solid #1e304a;
  background: #0d1a30;
  color: #7a9ac0;
  font-size: 0.82rem;
}

.cta-footer {
  color: var(--text-faint);
  font-size: 0.82rem;
  margin-top: 8px;
}
```

- [ ] **Step 7.2: 创建 CtaSection.tsx**

```tsx
// src/sections/CtaSection.tsx
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import './sections.css'

// CtaSection 渲染 Screen 4：安装命令 + CTA 按钮 + 特性标签。
export function CtaSection() {
  const { t } = useLang()
  const s = strings.cta
  const pills = [s.pills.ts, s.pills.llm, s.pills.dag, s.pills.oss]

  return (
    <section className="cta-section-new">
      <div className="cta-content">
        <span className="cta-badge">{t(s.badge.en, s.badge.zh)}</span>
        <h2 className="cta-title">{t(s.title.en, s.title.zh)}</h2>
        <p className="cta-desc">{t(s.desc.en, s.desc.zh)}</p>

        <div className="install-box">
          <div className="install-titlebar">
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span className="install-titlebar-label">bash</span>
          </div>
          <div className="install-cmd">
            <span className="install-prompt">$</span>
            <span className="install-text">npm install @stello-ai/core</span>
          </div>
        </div>

        <div className="cta-buttons">
          <a
            className="button button-primary"
            href="https://github.com/stello-agent/stello/tree/main/docs"
            target="_blank"
            rel="noreferrer"
          >
            {t(s.quickStart.en, s.quickStart.zh)}
          </a>
          <a
            className="button button-secondary"
            href="https://github.com/stello-agent/stello/tree/main/docs"
            target="_blank"
            rel="noreferrer"
          >
            {t(s.docs.en, s.docs.zh)}
          </a>
          <a
            className="button button-secondary"
            href="https://github.com/stello-agent/stello"
            target="_blank"
            rel="noreferrer"
          >
            {t(s.star.en, s.star.zh)}
          </a>
        </div>

        <div className="cta-pills">
          {pills.map((p) => (
            <span key={p.en} className="cta-pill">{t(p.en, p.zh)}</span>
          ))}
        </div>
      </div>

      <p className="cta-footer">{t(s.footer.en, s.footer.zh)}</p>
    </section>
  )
}
```

- [ ] **Step 7.3: 把 CtaSection 加入 App.tsx**

```tsx
import { CtaSection } from './sections/CtaSection'
// ...
<HeroSection />
<DagSection />
<MemorySection />
<CtaSection />
```

- [ ] **Step 7.4: `pnpm dev` 全页通读，确认 4 屏顺序和样式正确**

- [ ] **Step 7.5: Commit**

```bash
git add src/sections/CtaSection.tsx src/sections/sections.css
git commit -m "feat(website): 添加 CTA Section（Screen 4）完成 4 屏首页"
```

---

## Task 8: 收尾与验证

**Files:**
- Modify: `src/App.tsx` (清理旧 import 和数据)
- Modify: `src/App.css` (移除废弃的 hero-scroll 和 workflow 样式)

- [ ] **Step 8.1: 运行全量测试**

```bash
pnpm vitest run
```

Expected: useLang 3 tests + DagCanvas 2 tests + CardStack 2 tests = 7 PASS

- [ ] **Step 8.2: 运行构建**

```bash
pnpm build
```

Expected: 0 TS errors, dist 生成成功

- [ ] **Step 8.3: 清理 App.tsx 中旧数据常量（branchSessions、heroSteps、featureCards、workflowSteps、packageCards、metrics、useHeroProgress）**

直接删除已不需要的旧数据和 hook，保持文件只包含 Nav + AppInner + App。

- [ ] **Step 8.4: 清理 App.css 中旧样式（hero-scroll-section、hero-sticky、hero-story、hero-scene、branch-*、metrics-*、workflow-*、package-* 等）**

移除未使用的 class，保留 topbar、brand、button、lang-toggle 相关样式。

- [ ] **Step 8.5: 再次 `pnpm build` 确认无报错**

- [ ] **Step 8.6: Final commit**

```bash
git add -A
git commit -m "chore(website): 清理旧样式和数据，完成首页重构"
```
