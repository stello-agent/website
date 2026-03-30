// src/sections/MemorySection.tsx
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import { CardStack } from '../components/CardStack'

// MemorySection 展示三层记忆系统（Screen 4）
export function MemorySection() {
  const { t } = useLang()
  const s = strings.memory

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

  return (
    <section className="memory-section">
      <div className="memory-header">
        <span className="section-eyebrow">{t(s.eyebrow.en, s.eyebrow.zh)}</span>
        <h2>{t(s.title.en, s.title.zh)}</h2>
        <p className="memory-desc">{t(s.desc.en, s.desc.zh)}</p>
      </div>
      <CardStack cards={cards} />
    </section>
  )
}
