// src/sections/CtaSection.tsx
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'

// CtaSection 渲染页面底部行动召唤区域（Screen 4）
export function CtaSection() {
  const { t } = useLang()
  const s = strings.cta

  return (
    <section className="cta-section">
      <div className="cta-inner">
        <span className="cta-badge">{t(s.badge.en, s.badge.zh)}</span>
        <h2 className="cta-title">{t(s.title.en, s.title.zh)}</h2>
        <p className="cta-desc">{t(s.desc.en, s.desc.zh)}</p>

        <div className="cta-terminal">
          <span className="cta-terminal-prompt">$</span>
          <code className="cta-terminal-cmd">npx create-stello-app</code>
        </div>

        <div className="cta-actions">
          <a
            className="button button-primary"
            href="https://github.com/stello-agent/stello/tree/main/docs"
            target="_blank"
            rel="noreferrer"
          >
            {t(s.quickStart.en, s.quickStart.zh)}
          </a>
          <a
            className="button button-secondary"
            href="https://github.com/stello-agent/stello"
            target="_blank"
            rel="noreferrer"
          >
            {t(s.docs.en, s.docs.zh)}
          </a>
        </div>

        <div className="cta-pills">
          <span className="cta-pill">{t(s.pills.ts.en, s.pills.ts.zh)}</span>
          <span className="cta-pill">{t(s.pills.llm.en, s.pills.llm.zh)}</span>
          <span className="cta-pill">{t(s.pills.dag.en, s.pills.dag.zh)}</span>
          <span className="cta-pill">{t(s.pills.oss.en, s.pills.oss.zh)}</span>
        </div>

        <p className="cta-footer">{t(s.footer.en, s.footer.zh)}</p>
      </div>
    </section>
  )
}
