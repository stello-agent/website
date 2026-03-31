// src/sections/MemorySection.tsx
import { useState } from 'react'
import { CardStack } from '../components/CardStack'
import { TopologyGraph } from '../components/TopologyGraph'
import type { TopologyNode } from '../components/TopologyGraph'
import {
  memoryNodes,
  memoryEdges,
  MEMORY_GROUP_COLORS,
  CARD_INDEX_TO_GROUP,
  GROUP_TO_CARD_INDEX,
} from '../data/memoryTopoData'
import { strings } from '../data/i18n'
import { useThemeContext } from '../context/ThemeContext'
import { useLang } from '../hooks/useLang'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export function MemorySection() {
  const { t } = useLang()
  const { theme } = useThemeContext()
  const s = strings.memory

  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const activeGroup = CARD_INDEX_TO_GROUP[activeCardIndex]

  const [topoRef, topoVisible] = useIntersectionObserver<HTMLDivElement>()
  const [cardsRef, cardsVisible] = useIntersectionObserver<HTMLDivElement>()

  const cards = [
    {
      tag: s.l3.tag,
      name: t(s.l3.name.en, s.l3.name.zh),
      desc: t(s.l3.desc.en, s.l3.desc.zh),
      snippetKey: 'l3' as const,
      color: '#22ccbb',
    },
    {
      tag: s.l2.tag,
      name: t(s.l2.name.en, s.l2.name.zh),
      desc: t(s.l2.desc.en, s.l2.desc.zh),
      snippetKey: 'l2' as const,
      color: '#cc88ff',
    },
    {
      tag: s.l1.tag,
      name: t(s.l1.name.en, s.l1.name.zh),
      desc: t(s.l1.desc.en, s.l1.desc.zh),
      snippetKey: 'l1' as const,
      color: '#4488ff',
    },
  ]

  const handleNodeClick = (node: TopologyNode) => {
    if (node.group && node.group in GROUP_TO_CARD_INDEX) {
      setActiveCardIndex(GROUP_TO_CARD_INDEX[node.group])
    }
  }

  return (
    <section className="memory-section memory-v5">
      <div className="memory-header">
        <span className="section-eyebrow">{t(s.eyebrow.en, s.eyebrow.zh)}</span>
        <h2>{t(s.title.en, s.title.zh)}</h2>
        <p className="memory-desc">{t(s.desc.en, s.desc.zh)}</p>
      </div>

      <div className="memory-v5-body">
        <div
          ref={topoRef}
          className={`memory-v5-topo animate-in animate-in--left${topoVisible ? ' visible' : ''}`}
        >
          <TopologyGraph
            nodes={memoryNodes}
            edges={memoryEdges}
            activeGroup={activeGroup}
            highlightMode="click"
            onNodeClick={handleNodeClick}
            groupColors={MEMORY_GROUP_COLORS}
            width={420}
            height={380}
            theme={theme}
          />
        </div>

        <div
          ref={cardsRef}
          className={`memory-v5-cards animate-in animate-in--right${cardsVisible ? ' visible' : ''}`}
          style={{ transitionDelay: '100ms' }}
        >
          <CardStack
            cards={cards}
            activeIndex={activeCardIndex}
            onActiveChange={setActiveCardIndex}
          />
        </div>
      </div>
    </section>
  )
}
