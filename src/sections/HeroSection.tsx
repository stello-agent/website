// src/sections/HeroSection.tsx
import { useEffect, useState } from 'react'
import { TopologyGraph } from '../components/TopologyGraph'
import { heroCards, heroNodes, heroEdges, GROUP_COLORS } from '../data/heroData'
import { strings } from '../data/i18n'
import { useThemeContext } from '../context/ThemeContext'
import { useLang } from '../hooks/useLang'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './sections.css'

const TYPING_SPEED_MS = 55
const DELETING_SPEED_MS = 28
const HOLD_MS = 2200

type Phase = 'typing' | 'holding' | 'deleting'

export function HeroSection() {
  const { t, lang } = useLang()
  const { theme } = useThemeContext()
  const s = strings.hero

  const phrases = s.typewriterPhrases
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayLen, setDisplayLen] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)

  const fullPhrase = t(phrases[phraseIdx].en, phrases[phraseIdx].zh)
  const displayed = fullPhrase.slice(0, displayLen)

  // Entrance animation refs
  const [upperRef, upperVisible] = useIntersectionObserver<HTMLDivElement>()
  const [card0Ref, card0Visible] = useIntersectionObserver<HTMLDivElement>()
  const [card1Ref, card1Visible] = useIntersectionObserver<HTMLDivElement>()
  const [card2Ref, card2Visible] = useIntersectionObserver<HTMLDivElement>()
  const [topoRef, topoVisible] = useIntersectionObserver<HTMLDivElement>()

  const cardRefs = [card0Ref, card1Ref, card2Ref]
  const cardVisibles = [card0Visible, card1Visible, card2Visible]

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
    <section className="hero-section hero-v5">
      {/* Upper: Title + Typewriter + CTA buttons */}
      <div
        ref={upperRef}
        className={`hero-v5-upper animate-in${upperVisible ? ' visible' : ''}`}
      >
        <h1 className="hero-h1">
          <span className="hero-h1-brand">Stello</span>
        </h1>
        <p className="hero-subtitle">
          {t(
            'The first open-source Agent Cognitive Topology Engine',
            '首个开源 Agent 认知拓扑引擎'
          )}
        </p>
        <p className="hero-typewriter">
          {displayed}
          <span
            className={`hero-cursor${phase === 'holding' ? ' hero-cursor--blink' : ''}`}
            aria-hidden="true"
          >
            |
          </span>
        </p>
        <div className="hero-actions">
          <a href="/docs/getting-started/introduction" className="hero-btn hero-btn--primary">
            {t('Get Started', '快速开始')} →
          </a>
          <a
            href="https://github.com/stello-agent/stello"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn--secondary"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub ⭐
          </a>
          <a
            className="hero-btn hero-btn--tertiary"
            href="mailto:contact@stello.ai"
          >
            {t('Contact Us', '联系我们')}
          </a>
        </div>
      </div>

      {/* Lower: Cards + TopologyGraph */}
      <div className="hero-v5-lower">
        <div className="hero-v5-cards">
          {heroCards.map((card, i) => {
            const isActive = hoveredGroup === card.group
            return (
              <div
                key={card.id}
                ref={cardRefs[i]}
                className={`hero-v5-card animate-in${cardVisibles[i] ? ' visible' : ''}`}
                style={{
                  transitionDelay: `${100 + i * 100}ms`,
                  borderColor: isActive ? GROUP_COLORS[card.group] : undefined,
                  background: isActive ? 'var(--hero-card-active)' : undefined
                }}
                onMouseEnter={() => setHoveredGroup(card.group)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                <h3 className="hero-v5-card-title">
                  {t(card.title.en, card.title.zh)}
                </h3>
                <p className="hero-v5-card-content">
                  {t(card.content.en, card.content.zh)}
                </p>
                <p
                  className="hero-v5-card-highlight"
                  style={{ borderLeftColor: GROUP_COLORS[card.group] }}
                >
                  {t(card.highlight.en, card.highlight.zh)}
                </p>
              </div>
            )
          })}
        </div>
        <div
          ref={topoRef}
          className={`hero-v5-topo animate-in${topoVisible ? ' visible' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <TopologyGraph
            nodes={heroNodes}
            edges={heroEdges}
            activeGroup={hoveredGroup}
            highlightMode="hover"
            groupColors={GROUP_COLORS}
            width={680}
            height={500}
            theme={theme}
          />
        </div>
      </div>
    </section>
  )
}
