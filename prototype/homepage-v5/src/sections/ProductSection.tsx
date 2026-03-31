import { useState, useCallback } from 'react'
import { TopologyGraph } from '../components/TopologyGraph'
import { CodeCard } from '../components/CodeCard'
import { products, productNodes, productEdges } from '../data/products'
import type { TopologyNode } from '../data/hero'

export function ProductSection() {
  const [activeProdId, setActiveProdId] = useState(products[0].id)
  const [activeTabIdx, setActiveTabIdx] = useState(0)

  const activeProd = products.find((p) => p.id === activeProdId) ?? products[0]

  const handleNodeClick = useCallback(
    (node: TopologyNode) => {
      if (node.type === 'core' || node.type === 'decorative') return

      if (node.type === 'primary' && node.group) {
        const prod = products.find((p) => p.id === node.group)
        if (prod) {
          setActiveProdId(prod.id)
          setActiveTabIdx(0)
        }
      } else if (node.type === 'child' && node.parentId) {
        const parent = productNodes.find((n) => n.id === node.parentId)
        if (parent?.group) {
          const prod = products.find((p) => p.id === parent.group)
          if (prod) {
            setActiveProdId(prod.id)
            const siblings = productNodes.filter(
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
    <section id="products" style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.sectionTitle}>产品概览</h2>
        <p style={styles.sectionDesc}>
          四个包各司其职——从单 Session 记忆到完整拓扑编排，从 SDK 到可部署服务，渐进式采用。
        </p>
      </div>

      <div style={styles.content}>
        {/* Left: Code Card */}
        <div style={styles.cardWrap}>
          <CodeCard
            title={activeProd.subtitle}
            description={activeProd.description}
            tabs={activeProd.tabs}
            activeTabIndex={activeTabIdx}
            onTabChange={setActiveTabIdx}
          />
        </div>

        {/* Right: Topology in glass panel */}
        <div style={styles.topoPanel}>
          <TopologyGraph
            nodes={productNodes}
            edges={productEdges}
            activeGroup={activeProdId}
            highlightMode="click"
            onNodeClick={handleNodeClick}
            width={480}
            height={460}
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
  cardWrap: {
    flex: 1,
    minWidth: 0,
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
}
