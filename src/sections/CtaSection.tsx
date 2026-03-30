// src/sections/CtaSection.tsx
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'

// CtaSection 渲染页面底部行动召唤区域（Screen 5）
export function CtaSection() {
  const { t } = useLang()
  const s = strings.cta

  return (
    <section className="cta-section">
      <div className="cta-inner">
        <h2 className="cta-title">{t(s.title.en, s.title.zh)}</h2>
        <p className="cta-desc">{t(s.desc.en, s.desc.zh)}</p>
        <div className="cta-terminal">
          <div className="cta-terminal-titlebar" aria-hidden="true">
            <span className="cta-terminal-dots">
              <span /><span /><span />
            </span>
          </div>
          <div className="cta-terminal-body">
            <span className="cta-terminal-prompt">$</span>
            <code className="cta-terminal-cmd">npm install @stello-ai/core</code>
          </div>
        </div>
        <div className="cta-actions">
          <a
            className="button button-primary"
            href="/docs/quick-start"
          >
            {t(s.quickStart.en, s.quickStart.zh)}
          </a>
          <a
            className="button button-secondary"
            href="https://github.com/stello-agent/stello"
            target="_blank"
            rel="noreferrer"
          >
            {t(s.star.en, s.star.zh)}
          </a>
        </div>

        <p className="cta-footer">{t(s.footer.en, s.footer.zh)}</p>
      </div>
    </section>
  )
}
