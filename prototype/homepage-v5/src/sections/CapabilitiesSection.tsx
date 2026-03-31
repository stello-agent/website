import { useState, useCallback } from 'react'
import { TopologyGraph } from '../components/TopologyGraph'
import { CodeCard } from '../components/CodeCard'
import {
  capabilities,
  capabilityNodes,
  capabilityEdges,
} from '../data/capabilities'
import type { TopologyNode } from '../data/hero'

export function CapabilitiesSection() {
  const [activeCapId, setActiveCapId] = useState(capabilities[0].id)
  const [activeTabIdx, setActiveTabIdx] = useState(0)

  const activeCap = capabilities.find((c) => c.id === activeCapId) ?? capabilities[0]

  const handleNodeClick = useCallback(
    (node: TopologyNode) => {
      if (node.type === 'core' || node.type === 'decorative') return

      if (node.type === 'primary' && node.group) {
        const cap = capabilities.find((c) => c.id === node.group)
        if (cap) {
          setActiveCapId(cap.id)
          setActiveTabIdx(0)
        }
      } else if (node.type === 'child' && node.parentId) {
        const parent = capabilityNodes.find((n) => n.id === node.parentId)
        if (parent?.group) {
          const cap = capabilities.find((c) => c.id === parent.group)
          if (cap) {
            setActiveCapId(cap.id)
            const siblings = capabilityNodes.filter(
              (n) => n.parentId === node.parentId && n.type === 'child'
            )
            const idx = siblings.findIndex((s) => s.id === node.id)
            setActiveTabIdx(Math.max(0, idx))
          }
        }
      }
    },
    []
  )

  return (
    <section id="capabilities" style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.sectionTitle}>核心能力</h2>
        <p style={styles.sectionDesc}>
          深入了解 Stello 的技术核心——对话自动分裂、三层记忆、全局意识整合，一切异步零开销。
        </p>
      </div>

      <div style={styles.content}>
        {/* Left: Topology in glass panel */}
        <div style={styles.topoPanel}>
          <TopologyGraph
            nodes={capabilityNodes}
            edges={capabilityEdges}
            activeGroup={activeCapId}
            highlightMode="click"
            onNodeClick={handleNodeClick}
            width={480}
            height={460}
          />
        </div>

        {/* Right: Code Card */}
        <div style={styles.cardWrap}>
          <CodeCard
            title={activeCap.subtitle}
            description={activeCap.description}
            tabs={activeCap.tabs}
            activeTabIndex={activeTabIdx}
            onTabChange={setActiveTabIdx}
          />
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
  },
}
