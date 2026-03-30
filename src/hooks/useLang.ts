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
