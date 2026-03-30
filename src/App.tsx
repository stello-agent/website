// src/App.tsx
import { LangProvider } from './context/LangContext'
import { ThemeProvider, useThemeContext } from './context/ThemeContext'
import { useLang } from './hooks/useLang'
import { HeroSection } from './sections/HeroSection'
import { BrainstormSection } from './sections/BrainstormSection'
import { UseCasesSection } from './sections/UseCasesSection'
import { MemorySection } from './sections/MemorySection'
import { CtaSection } from './sections/CtaSection'
import { Moon, Sun, Languages } from 'lucide-react'
import logoLight from './assets/stello_logo.svg'
import logoDark from './assets/stello_logo_light.svg'

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )
}
import './index.css'
import './App.css'

// Nav 顶部导航：主题切换、语言切换、GitHub 链接
function Nav() {
  const { toggle: toggleLang } = useLang()
  const { theme, toggle: toggleTheme } = useThemeContext()
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Stello home">
        <img className="brand-logo" src={theme === 'light' ? logoLight : logoDark} alt="" aria-hidden="true" />
        <span className="brand-name">Stello</span>
      </a>
      <div className="topbar-right">
        <button className="nav-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <button className="nav-icon-btn" onClick={toggleLang} aria-label="Toggle language">
          <Languages size={16} />
        </button>
        <span className="nav-sep" aria-hidden="true" />
        <a
          className="nav-github-btn"
          href="https://github.com/stello-agent/stello"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GithubIcon />
          GitHub
        </a>
      </div>
    </header>
  )
}

// AppInner 渲染五屏首页。
function AppInner() {
  return (
    <div className="page-shell">
      <Nav />
      <main>
        <HeroSection />
        <MemorySection />
        <BrainstormSection />
        <UseCasesSection />
        <CtaSection />
      </main>
    </div>
  )
}

// App 根组件，提供 LangContext 和 ThemeContext。
export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AppInner />
      </LangProvider>
    </ThemeProvider>
  )
}
