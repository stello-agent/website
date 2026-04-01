// src/sections/ProductOverviewSection.tsx
// Screen 3: Product Overview — left cards + right topology (opposite of Screen 2)
import { useState } from 'react'
import { TopologyGraph } from '../components/TopologyGraph'
import type { TopologyNode } from '../components/TopologyGraph'
import { CodeEditor } from '../components/CodeEditor'
import {
  products,
  productNodes,
  productEdges,
  PRODUCT_GROUP_COLORS,
} from '../data/productOverviewData'
import { useThemeContext } from '../context/ThemeContext'
import { useLang } from '../hooks/useLang'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './sections.css'

export function ProductOverviewSection() {
  const { t } = useLang()
  const { theme } = useThemeContext()

  const [activeId, setActiveId] = useState(products[0].id)
  const [activeTab, setActiveTab] = useState(0)
  const activeProduct = products.find((p) => p.id === activeId) ?? products[0]

  const [panelRef, panelVisible] = useIntersectionObserver<HTMLDivElement>()

  // Build child node → { productId, tabIndex } map
  const childNodeMap = new Map<string, { productId: string; tabIndex: number }>()
  for (const node of productNodes) {
    if (node.type === 'child' && node.group) {
      const prod = products.find((p) => p.id === node.group)
      if (prod) {
        const siblings = productNodes.filter(
          (n) => n.type === 'child' && n.group === node.group
        )
        const tabIndex = siblings.indexOf(node)
        if (tabIndex >= 0 && tabIndex < prod.tabs.length) {
          childNodeMap.set(node.id, { productId: prod.id, tabIndex })
        }
      }
    }
  }

  const handleNodeClick = (node: TopologyNode) => {
    const childMapping = childNodeMap.get(node.id)
    if (childMapping) {
      if (activeId !== childMapping.productId) {
        setActiveId(childMapping.productId)
      }
      setActiveTab(childMapping.tabIndex)
      return
    }
    if (!node.group) return
    const prod = products.find((p) => p.id === node.group)
    if (prod) {
      setActiveId(prod.id)
      setActiveTab(0)
    }
  }

  // Determine selected child node for topology highlighting
  const activeChildNodes = productNodes.filter(
    (n) => n.type === 'child' && n.group === activeId
  )
  const selectedNodeId = activeChildNodes[activeTab]?.id ?? null

  return (
    <section className="topo-section topo-section--right">
      {/* Left: cards */}
      <div
        ref={panelRef}
        className={`cap-panel animate-in animate-in--left${panelVisible ? ' visible' : ''}`}
        style={{ transitionDelay: '100ms' }}
      >
        <h3 className="cap-panel-title">
          {t(activeProduct.subtitle.en, activeProduct.subtitle.zh)}
        </h3>
        <p className="cap-panel-subtitle" style={{ color: PRODUCT_GROUP_COLORS[activeId] }}>
          {activeProduct.title.en}
        </p>
        <p className="cap-panel-desc">
          {t(activeProduct.description.en, activeProduct.description.zh)}
        </p>

        <div className="cap-pills">
          {products.map((prod) => (
            <button
              key={prod.id}
              type="button"
              className={`cap-pill${activeId === prod.id ? ' cap-pill--active' : ''}`}
              style={
                activeId === prod.id
                  ? { borderColor: PRODUCT_GROUP_COLORS[prod.id], color: PRODUCT_GROUP_COLORS[prod.id] }
                  : undefined
              }
              onClick={() => { setActiveId(prod.id); setActiveTab(0) }}
            >
              {prod.title.en}
            </button>
          ))}
        </div>

        {/* Code tabs */}
        <div className="cap-code-tabs">
          {activeProduct.tabs.map((tab, i) => (
            <button
              key={tab.name}
              type="button"
              className={`cap-code-tab${activeTab === i ? ' cap-code-tab--active' : ''}`}
              style={activeTab === i ? { borderBottomColor: PRODUCT_GROUP_COLORS[activeId] } : undefined}
              onClick={() => setActiveTab(i)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="cap-editor-wrap">
          <CodeEditor
            key={`${activeId}-${activeTab}`}
            code={activeProduct.tabs[activeTab]?.code ?? ''}
            filename={activeProduct.tabs[activeTab]?.name ?? 'snippet.ts'}
            accentColor={PRODUCT_GROUP_COLORS[activeId]}
          />
        </div>
      </div>

      {/* Right: topology */}
      <TopologyGraph
        nodes={productNodes}
        edges={productEdges}
        activeGroup={activeId}
        selectedNodeId={selectedNodeId}
        highlightMode="click"
        onNodeClick={handleNodeClick}
        groupColors={PRODUCT_GROUP_COLORS}
        width={560}
        height={420}
        theme={theme}
      />
    </section>
  )
}
