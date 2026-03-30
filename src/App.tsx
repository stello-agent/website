// src/App.tsx
import { LangProvider } from './context/LangContext'
import { useLang } from './hooks/useLang'
import { strings } from './data/i18n'
import './index.css'
import './App.css'

const NAV_LINKS = [
  { key: 'docs' as const, href: 'https://github.com/stello-agent/stello/tree/main/docs' },
  { key: 'examples' as const, href: 'https://github.com/stello-agent/stello/tree/main/examples' },
  { key: 'github' as const, href: 'https://github.com/stello-agent/stello' },
]

// Nav 顶部导航，含语言切换。
function Nav() {
  const { lang, toggle, t } = useLang()
  const s = strings.nav
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
          <a key={item.key} href={item.href} target="_blank" rel="noreferrer">
            {t(s[item.key].en, s[item.key].zh)}
          </a>
        ))}
      </nav>
      <button className="lang-toggle" onClick={toggle} aria-label="Toggle language">
        {lang === 'en' ? 'EN | 中文' : 'EN | 中文'}
      </button>
    </header>
  )
}

// AppInner 渲染整页，Section 将逐步填充。
function AppInner() {
  return (
    <div className="page-shell">
      <Nav />
      <main>
        {/* Sections will be added in Tasks 4-7 */}
      </main>
    </div>
  )
}

// App 根组件，提供 LangContext。
export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}
