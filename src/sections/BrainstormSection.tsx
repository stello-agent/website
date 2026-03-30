// src/sections/BrainstormSection.tsx
import { useMemo } from 'react'
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import { BRAINSTORM_TOPO } from '../data/topoData'
import { TopologyDemo } from '../components/TopologyDemo'
import './sections.css'

// BrainstormSection — Screen 3：左侧大拓扑图（产品头脑风暴）+ 右侧描述
export function BrainstormSection() {
  const { t, lang } = useLang()
  const s = strings.brainstorm

  const nodes = useMemo(
    () => BRAINSTORM_TOPO.map((n) => ({ ...n, label: lang === 'en' ? n.label.en : n.label.zh })),
    [lang],
  )

  return (
    <section className="topo-section topo-section--left">
      <div className="topo-canvas-wrap">
        <TopologyDemo nodes={nodes} />
      </div>

      <div className="topo-text">
        <span className="section-eyebrow">{t(s.eyebrow.en, s.eyebrow.zh)}</span>
        <h2>{t(s.title.en, s.title.zh)}</h2>
        <p className="topo-desc">{t(s.desc.en, s.desc.zh)}</p>
        <ul className="topo-features">
          {s.cards.map((card, i) => (
            <li key={i}>
              <span className="topo-feature-dot" aria-hidden="true" />
              <div>
                <strong>{t(card.title.en, card.title.zh)}</strong>
                <p>{t(card.desc.en, card.desc.zh)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
