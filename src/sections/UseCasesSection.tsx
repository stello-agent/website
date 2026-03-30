// src/sections/UseCasesSection.tsx
import { useMemo } from 'react'
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import { USE_CASES_TOPO } from '../data/topoData'
import { TopologyDemo } from '../components/TopologyDemo'
import './sections.css'

// UseCasesSection — Screen 4：左侧描述 + 右侧大拓扑图（留学/考研/考公场景）
export function UseCasesSection() {
  const { t, lang } = useLang()
  const s = strings.useCases

  const nodes = useMemo(
    () => USE_CASES_TOPO.map((n) => ({ ...n, label: lang === 'en' ? n.label.en : n.label.zh })),
    [lang],
  )

  return (
    <section className="topo-section topo-section--right">
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

      <div className="topo-canvas-wrap">
        <TopologyDemo nodes={nodes} />
      </div>
    </section>
  )
}
