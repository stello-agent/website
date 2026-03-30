// src/sections/DagSection.tsx — kept for reference, not used in App.tsx
import { useLang } from '../hooks/useLang'
import { DagCanvas } from '../components/DagCanvas'
import { DAG_NODES, DAG_EDGES } from '../data/dagData'

// DagSection 展示 Session 拓扑可视化演示（已被 BrainstormSection 替换）
export function DagSection() {
  const { t } = useLang()
  return (
    <section style={{ height: '100svh', scrollSnapAlign: 'start', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', padding: '100px 48px 60px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-blue)' }}>
          {t('SESSION TOPOLOGY', 'SESSION 拓扑')}
        </span>
        <h2>{t('Conversations That Branch', '让思路自由分叉')}</h2>
      </div>
      <div style={{ aspectRatio: '16/10', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', overflow: 'hidden', padding: '16px' }}>
        <DagCanvas nodes={DAG_NODES} edges={DAG_EDGES} />
      </div>
    </section>
  )
}
