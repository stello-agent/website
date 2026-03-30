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
  const [lang, setLang] = useState<Lang>('zh')
  const toggle = () => setLang((l) => (l === 'en' ? 'zh' : 'en'))
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

// useLangContext 供内部使用，保证在 Provider 内。
export function useLangContext(): LangCtx {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLangContext must be used within LangProvider')
  return ctx
}
