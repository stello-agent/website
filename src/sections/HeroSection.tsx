// src/sections/HeroSection.tsx
import { useEffect, useState } from 'react'
import { TopologyDemo } from '../components/TopologyDemo'
import { strings } from '../data/i18n'
import { useLang } from '../hooks/useLang'
import './sections.css'

const TYPING_SPEED_MS = 55
const DELETING_SPEED_MS = 28
const HOLD_MS = 2200

type Phase = 'typing' | 'holding' | 'deleting'

// HeroSection 渲染 Screen 1：左侧文字 + 右侧实时 DAG 演示
export function HeroSection() {
  const { t, lang } = useLang()
  const s = strings.hero

  const phrases = s.typewriterPhrases
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayLen, setDisplayLen] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

  const fullPhrase = t(phrases[phraseIdx].en, phrases[phraseIdx].zh)
  const displayed = fullPhrase.slice(0, displayLen)

  // Reset on language change
  useEffect(() => {
    setPhraseIdx(0)
    setDisplayLen(0)
    setPhase('typing')
  }, [lang])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (phase === 'typing') {
      if (displayLen < fullPhrase.length) {
        timer = setTimeout(() => setDisplayLen((l) => l + 1), TYPING_SPEED_MS)
      } else {
        setPhase('holding')
      }
    } else if (phase === 'holding') {
      timer = setTimeout(() => setPhase('deleting'), HOLD_MS)
    } else {
      if (displayLen > 0) {
        timer = setTimeout(() => setDisplayLen((l) => l - 1), DELETING_SPEED_MS)
      } else {
        setPhraseIdx((i) => (i + 1) % phrases.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timer)
  }, [phase, displayLen, fullPhrase, phrases.length])

  return (
    <section className="hero-section hero-section--split">
      {/* Left column */}
      <div className="hero-left">
        <h1 className="hero-h1">
          <span className="hero-h1-brand">
            {t(s.titleStatic.en, s.titleStatic.zh)}
          </span>
        </h1>

        <p className="hero-subtitle">首个开源 Agent 认知拓扑引擎</p>

        <p className="hero-typewriter">
          {displayed}
          <span
            className={`hero-cursor${phase === 'holding' ? ' hero-cursor--blink' : ''}`}
            aria-hidden="true"
          >
            |
          </span>
        </p>

        <p className="hero-desc">{t(s.desc.en, s.desc.zh)}</p>

        <ul className="hero-features">
          {s.features.map((f, i) => (
            <li key={i}>
              <span className="hero-feature-dot" aria-hidden="true" />
              {t(f.en, f.zh)}
            </li>
          ))}
        </ul>

        {/* <div className="hero-install">
          <code>npm install @stello-ai/core</code>
        </div> */}
      </div>

      {/* Right column: session topology demo */}
      <div className="hero-dag-wrap">
        <TopologyDemo />
      </div>
    </section>
  )
}
