import { useState, useCallback } from 'react'
import { TopologyGraph } from '../components/TopologyGraph'
import { usecases, usecaseNodes, usecaseEdges } from '../data/usecases'
import type { TopologyNode } from '../data/hero'

export function UseCasesSection() {
  const [activeUcId, setActiveUcId] = useState(usecases[0].id)

  const activeUc = usecases.find((u) => u.id === activeUcId) ?? usecases[0]

  const handleNodeClick = useCallback(
    (node: TopologyNode) => {
      if (node.type === 'core' || node.type === 'decorative') return
      const group = node.group
      if (group) {
        const uc = usecases.find((u) => u.id === group)
        if (uc) setActiveUcId(uc.id)
      }
    },
    []
  )

  return (
    <section id="usecases" style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.sectionTitle}>落地场景</h2>
        <p style={styles.sectionDesc}>
          深度咨询、知识探索、体系构建、创意创作、办公协作——Stello 让每一种场景都能并行推进、全局洞察。
        </p>
      </div>

      <div style={styles.content}>
        {/* Left: Topology in glass panel */}
        <div style={styles.topoPanel}>
          <TopologyGraph
            nodes={usecaseNodes}
            edges={usecaseEdges}
            activeGroup={activeUcId}
            highlightMode="click"
            onNodeClick={handleNodeClick}
            width={480}
            height={460}
          />
        </div>

        {/* Right: Text Card */}
        <div style={styles.cardWrap}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>{activeUc.title}</h3>
              <span style={styles.cardSubtitle}>{activeUc.subtitle}</span>
            </div>
            <p style={styles.cardDesc}>{activeUc.description}</p>
            <div style={styles.tags}>
              {activeUc.children.map((child) => (
                <span key={child} style={styles.tag}>
                  {child}
                </span>
              ))}
            </div>
          </div>

          {/* Quick nav pills */}
          <div style={styles.pills}>
            {usecases.map((uc) => (
              <button
                key={uc.id}
                style={{
                  ...styles.pill,
                  ...(activeUcId === uc.id ? styles.pillActive : {}),
                }}
                onClick={() => setActiveUcId(uc.id)}
              >
                {uc.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    minHeight: '100vh',
    padding: '80px 24px',
    maxWidth: 1200,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 700,
    color: '#f1f5f9',
    margin: '0 0 12px',
    letterSpacing: '-0.5px',
  },
  sectionDesc: {
    fontSize: 16,
    color: '#94a3b8',
    maxWidth: 600,
    margin: '0 auto',
    lineHeight: 1.7,
  },
  content: {
    display: 'flex',
    gap: 32,
    alignItems: 'flex-start',
  },
  topoPanel: {
    flex: '0 0 480px',
    display: 'flex',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 22,
    background: 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  cardWrap: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  card: {
    padding: '28px 30px',
    borderRadius: 18,
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  cardHeader: {
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#f1f5f9',
    margin: '0 0 4px',
    letterSpacing: '-0.3px',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#a855f7',
    fontWeight: 500,
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 1.85,
    color: '#94a3b8',
    margin: '0 0 20px',
  },
  tags: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    padding: '6px 14px',
    borderRadius: 10,
    background: 'rgba(34, 197, 94, 0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(34, 197, 94, 0.15)',
    color: '#22c55e',
    fontSize: 13,
    fontWeight: 500,
  },
  pills: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  pill: {
    padding: '8px 16px',
    borderRadius: 10,
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.07)',
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  pillActive: {
    background: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    color: '#c084fc',
    boxShadow: '0 2px 12px rgba(168, 85, 247, 0.15)',
  },
}
