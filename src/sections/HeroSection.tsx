// src/sections/HeroSection.tsx
import { useState, useEffect } from 'react'
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import './sections.css'

const TYPING_SPEED_MS = 60
const DELETING_SPEED_MS = 32
const HOLD_MS = 3000

type Phase = 'typing' | 'holding' | 'deleting'

// HeroSection 渲染 Screen 1：badge + 打字机轮换大标题 + 描述 + CTA。
export function HeroSection() {
  const { t } = useLang()
  const s = strings.hero
  const slogans = s.slogans

  const [sloganIdx, setSloganIdx] = useState(0)
  const [displayLen, setDisplayLen] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

  const currentSlogan = slogans[sloganIdx]
  const fullLine2 = t(currentSlogan.line2.en, currentSlogan.line2.zh)
  const displayLine2 = fullLine2.slice(0, displayLen)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayLen < fullLine2.length) {
        timer = setTimeout(() => setDisplayLen(l => l + 1), TYPING_SPEED_MS)
      } else {
        setPhase('holding')
      }
    } else if (phase === 'holding') {
      timer = setTimeout(() => setPhase('deleting'), HOLD_MS)
    } else {
      // deleting
      if (displayLen > 0) {
        timer = setTimeout(() => setDisplayLen(l => l - 1), DELETING_SPEED_MS)
      } else {
        setSloganIdx(i => (i + 1) % slogans.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timer)
  }, [phase, displayLen, fullLine2, slogans.length])

  return (
    <section className="hero-section">
      <span className="hero-badge">
        <span className="hero-badge-dot" aria-hidden="true" />
        {t(s.badge.en, s.badge.zh)}
      </span>

      <h1 className="hero-h1">
        <span className="hero-h1-line1" key={sloganIdx}>
          {t(currentSlogan.line1.en, currentSlogan.line1.zh)}
        </span>
        <span className="hero-h1-accent">
          {displayLine2}
          <span
            className={`hero-cursor${phase === 'holding' ? ' hero-cursor--blink' : ''}`}
            aria-hidden="true"
          >|</span>
        </span>
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
