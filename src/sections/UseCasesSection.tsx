// src/sections/UseCasesSection.tsx
// Interactive use cases: click topology nodes or pills → switch scenario card
import { useState } from 'react'
import { TopologyGraph } from '../components/TopologyGraph'
import type { TopologyNode } from '../components/TopologyGraph'
import {
  usecases,
  usecaseNodes,
  usecaseEdges,
  UC_GROUP_COLORS,
} from '../data/usecasesData'
import { useThemeContext } from '../context/ThemeContext'
import { useLang } from '../hooks/useLang'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './sections.css'

export function UseCasesSection() {
  const { t } = useLang()
  const { theme } = useThemeContext()

  const [activeId, setActiveId] = useState(usecases[0].id)
  const activeCase = usecases.find((u) => u.id === activeId) ?? usecases[0]

  const [panelRef, panelVisible] = useIntersectionObserver<HTMLDivElement>()

  const handleNodeClick = (node: TopologyNode) => {
    if (!node.group) return
    const uc = usecases.find((u) => u.id === node.group)
    if (uc) setActiveId(uc.id)
  }

  return (
    <section className="topo-section topo-section--right">
      {/* Left: scenario card */}
      <div
        ref={panelRef}
        className={`uc-panel animate-in animate-in--left${panelVisible ? ' visible' : ''}`}
      >
        <h3 className="uc-panel-title">
          {t(activeCase.title.en, activeCase.title.zh)}
        </h3>
        <p className="uc-panel-subtitle" style={{ color: UC_GROUP_COLORS[activeId] }}>
          {t(activeCase.subtitle.en, activeCase.subtitle.zh)}
        </p>
        <p className="uc-panel-desc">
          {t(activeCase.description.en, activeCase.description.zh)}
        </p>

        {/* Child scenario tags */}
        <div className="uc-children">
          {activeCase.children.map((child, i) => (
            <span
              key={i}
              className="uc-child-tag"
              style={{ borderColor: UC_GROUP_COLORS[activeId], color: UC_GROUP_COLORS[activeId] }}
            >
              {t(child.en, child.zh)}
            </span>
          ))}
        </div>

        {/* Navigation pills — all scenarios */}
        <div className="uc-nav-pills">
          {usecases.map((uc) => (
            <button
              key={uc.id}
              type="button"
              className={`uc-pill${activeId === uc.id ? ' uc-pill--active' : ''}`}
              style={
                activeId === uc.id
                  ? { borderColor: UC_GROUP_COLORS[uc.id], color: UC_GROUP_COLORS[uc.id] }
                  : undefined
              }
              onClick={() => setActiveId(uc.id)}
            >
              {t(uc.title.en, uc.title.zh)}
            </button>
          ))}
        </div>
      </div>

      {/* Right: topology */}
      <TopologyGraph
        nodes={usecaseNodes}
        edges={usecaseEdges}
        activeGroup={activeId}
        highlightMode="click"
        onNodeClick={handleNodeClick}
        groupColors={UC_GROUP_COLORS}
        width={560}
        height={420}
        theme={theme}
      />
    </section>
  )
}
