// src/sections/BrainstormSection.tsx
// Interactive capabilities section: click topology nodes → switch code tabs
import { useState } from 'react'
import { TopologyGraph } from '../components/TopologyGraph'
import type { TopologyNode } from '../components/TopologyGraph'
import { CodeEditor } from '../components/CodeEditor'
import {
  capabilities,
  capabilityNodes,
  capabilityEdges,
  GROUP_COLORS,
} from '../data/capabilitiesData'
import { useThemeContext } from '../context/ThemeContext'
import { useLang } from '../hooks/useLang'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './sections.css'

export function BrainstormSection() {
  const { t } = useLang()
  const { theme } = useThemeContext()

  const [activeId, setActiveId] = useState(capabilities[0].id)
  const [activeTab, setActiveTab] = useState(0)
  const activeCap = capabilities.find((c) => c.id === activeId) ?? capabilities[0]

  const [topoRef, topoVisible] = useIntersectionObserver<HTMLDivElement>()
  const [panelRef, panelVisible] = useIntersectionObserver<HTMLDivElement>()

  const handleNodeClick = (node: TopologyNode) => {
    if (!node.group) return
    const cap = capabilities.find((c) => c.id === node.group)
    if (cap) {
      setActiveId(cap.id)
      setActiveTab(0)
    }
  }

  return (
    <section className="topo-section topo-section--left">
        <TopologyGraph
          nodes={capabilityNodes}
          edges={capabilityEdges}
          activeGroup={activeId}
          highlightMode="click"
          onNodeClick={handleNodeClick}
          groupColors={GROUP_COLORS}
          width={560}
          height={420}
          theme={theme}
        />

      <div
        ref={panelRef}
        className={`cap-panel animate-in animate-in--right${panelVisible ? ' visible' : ''}`}
        style={{ transitionDelay: '100ms' }}
      >
        <h3 className="cap-panel-title">
          {t(activeCap.title.en, activeCap.title.zh)}
        </h3>
        <p className="cap-panel-subtitle" style={{ color: GROUP_COLORS[activeId] }}>
          {t(activeCap.subtitle.en, activeCap.subtitle.zh)}
        </p>
        <p className="cap-panel-desc">
          {t(activeCap.description.en, activeCap.description.zh)}
        </p>

        <div className="cap-pills">
          {capabilities.map((cap) => (
            <button
              key={cap.id}
              type="button"
              className={`cap-pill${activeId === cap.id ? ' cap-pill--active' : ''}`}
              style={
                activeId === cap.id
                  ? { borderColor: GROUP_COLORS[cap.id], color: GROUP_COLORS[cap.id] }
                  : undefined
              }
              onClick={() => { setActiveId(cap.id); setActiveTab(0) }}
            >
              {t(cap.title.en, cap.title.zh)}
            </button>
          ))}
        </div>

        {/* Code tabs — rendered as monaco-style editors */}
        <div className="cap-code-tabs">
          {activeCap.tabs.map((tab, i) => (
            <button
              key={tab.name}
              type="button"
              className={`cap-code-tab${activeTab === i ? ' cap-code-tab--active' : ''}`}
              style={activeTab === i ? { borderBottomColor: GROUP_COLORS[activeId] } : undefined}
              onClick={() => setActiveTab(i)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="cap-editor-wrap">
          <CodeEditor
            key={`${activeId}-${activeTab}`}
            code={activeCap.tabs[activeTab]?.code ?? ''}
            filename={activeCap.tabs[activeTab]?.name ?? 'snippet.ts'}
            accentColor={GROUP_COLORS[activeId]}
          />
        </div>
      </div>
    </section>
  )
}
