import { useState } from 'react'
import { ArrowRight, Star, Mail } from 'lucide-react'
import { TypewriterText } from '../components/TypewriterText'
import { TopologyGraph } from '../components/TopologyGraph'
import { heroSlogans, heroCards, heroNodes, heroEdges } from '../data/hero'

const GROUP_COLORS: Record<string, string> = {
  problem: '#6b7280',
  what: '#22c55e',
  build: '#a855f7',
}

export function HeroSection() {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)

  return (
    <section style={styles.section}>
      {/* Upper: Title + Slogan + CTA */}
      <div style={styles.upper}>
        <h1 style={styles.title}>
          Stello — 首个开源 Agent 认知拓扑引擎
        </h1>
        <div style={styles.sloganWrap}>
          <TypewriterText texts={heroSlogans} style={styles.slogan} />
        </div>
        <div style={styles.cta}>
          <a href="https://github.com/stello-agent/stello/tree/main/docs" style={styles.btnPrimary}>
            快速开始 <ArrowRight size={16} />
          </a>
          <a href="https://github.com/stello-agent/stello" target="_blank" rel="noopener" style={styles.btnSecondary}>
            <Star size={16} /> GitHub
          </a>
          <a href="#cta" style={styles.btnTertiary}>
            <Mail size={14} /> 联系我们
          </a>
        </div>
      </div>

      {/* Lower: Cards + Topology */}
      <div style={styles.lower}>
        <div style={styles.cards}>
          {heroCards.map((card) => {
            const isActive = hoveredGroup === card.group
            return (
              <div
                key={card.id}
                style={{
                  ...styles.card,
                  borderColor: isActive
                    ? GROUP_COLORS[card.group]
                    : 'rgba(255,255,255,0.07)',
                  background: isActive
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.03)',
                  boxShadow: isActive
                    ? `0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)`
                    : '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
                onMouseEnter={() => setHoveredGroup(card.group)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardContent}>{card.content}</p>
                <p style={styles.cardHighlight}>{card.highlight}</p>
              </div>
            )
          })}
        </div>
        <div style={styles.topoWrap}>
          <TopologyGraph
            nodes={heroNodes}
            edges={heroEdges}
            activeGroup={hoveredGroup}
            highlightMode="hover"
            groupColors={GROUP_COLORS}
            width={540}
            height={440}
          />
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 60,
    position: 'relative',
  },
  upper: {
    textAlign: 'center',
    maxWidth: 800,
    marginBottom: 48,
    padding: '0 24px',
  },
  title: {
    fontSize: 44,
    fontWeight: 700,
    color: '#f1f5f9',
    letterSpacing: '-1px',
    lineHeight: 1.2,
    margin: '0 0 16px',
  },
  sloganWrap: {
    height: 36,
    marginBottom: 28,
  },
  slogan: {
    fontSize: 20,
    color: '#94a3b8',
  },
  cta: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 28px',
    borderRadius: 12,
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    textDecoration: 'none',
    boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
    transition: 'all 0.2s',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: 500,
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.2s',
  },
  btnTertiary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '12px 20px',
    borderRadius: 12,
    color: '#94a3b8',
    fontSize: 14,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  lower: {
    display: 'flex',
    gap: 32,
    maxWidth: 1200,
    width: '100%',
    padding: '0 24px',
    alignItems: 'flex-start',
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    flex: '0 0 480px',
  },
  card: {
    padding: '22px 26px',
    borderRadius: 18,
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
    textAlign: 'left',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#f1f5f9',
    margin: '0 0 8px',
    letterSpacing: '-0.2px',
  },
  cardContent: {
    fontSize: 13.5,
    lineHeight: 1.7,
    color: '#94a3b8',
    margin: '0 0 8px',
  },
  cardHighlight: {
    fontSize: 13.5,
    fontWeight: 600,
    color: '#e2e8f0',
    margin: 0,
  },
  topoWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}
