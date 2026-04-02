// src/sections/OverviewSection.tsx
import { useState } from 'react'
import { TopologyGraph } from '../components/TopologyGraph'
import { heroCards, heroNodes, heroEdges, GROUP_COLORS } from '../data/heroData'
import { useThemeContext } from '../context/ThemeContext'
import { useLang } from '../hooks/useLang'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './sections.css'

export function OverviewSection() {
  const { t } = useLang()
  const { theme } = useThemeContext()
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)

  const [card0Ref, card0Visible] = useIntersectionObserver<HTMLDivElement>()
  const [card1Ref, card1Visible] = useIntersectionObserver<HTMLDivElement>()
  const [card2Ref, card2Visible] = useIntersectionObserver<HTMLDivElement>()
  const [topoRef, topoVisible] = useIntersectionObserver<HTMLDivElement>()

  const cardRefs = [card0Ref, card1Ref, card2Ref]
  const cardVisibles = [card0Visible, card1Visible, card2Visible]

  return (
    <section className="hero-section hero-v5 hero-v5--overview">
      <div className="hero-v5-lower">
        <div className="hero-v5-cards">
        {heroCards.map((card, i) => {
          const isActive = hoveredGroup === card.group
          return (
            <div
              key={card.id}
              ref={cardRefs[i]}
              className={`overview-card animate-in${cardVisibles[i] ? ' visible' : ''}`}
              style={{
                transitionDelay: `${100 + i * 100}ms`,
                borderColor: isActive ? GROUP_COLORS[card.group] : undefined,
                background: isActive ? 'var(--hero-card-active)' : undefined
              }}
              onMouseEnter={() => setHoveredGroup(card.group)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <h3 className="overview-card-title">
                {t(card.title.en, card.title.zh)}
              </h3>
              <p className="overview-card-desc">
                {t(card.content.en, card.content.zh)}
              </p>
              <p
                className="overview-card-highlight"
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
            groupColors={GROUP_COLORS}
            width={560}
            height={420}
            theme={theme}
          />
        </div>
      </div>
    </section>
  )
}
