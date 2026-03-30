import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import { DagCanvas } from '../components/DagCanvas'
import { DAG_NODES, DAG_EDGES } from '../data/dagData'

// DagSection 展示 Session 拓扑可视化演示（Screen 2）
export function DagSection() {
  const { t } = useLang()
  const s = strings.dag
  return (
    <section className="dag-section">
      <div className="dag-text">
        <span className="section-eyebrow">{t(s.eyebrow.en, s.eyebrow.zh)}</span>
        <h2>{t(s.title.en, s.title.zh)}</h2>
        <p className="dag-desc">{t(s.desc.en, s.desc.zh)}</p>
        <p className="dag-hint">{t(s.dragHint.en, s.dragHint.zh)}</p>
      </div>
      <div className="dag-canvas-wrap">
        <DagCanvas nodes={DAG_NODES} edges={DAG_EDGES} />
      </div>
    </section>
  )
}
