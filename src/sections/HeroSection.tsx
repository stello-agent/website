// src/sections/HeroSection.tsx
import { useLang } from '../hooks/useLang'
import { strings } from '../data/i18n'
import './sections.css'

// HeroSection 渲染 Screen 1：badge + 双行大标题 + 描述 + CTA。
export function HeroSection() {
  const { t } = useLang()
  const s = strings.hero

  return (
    <section className="hero-section">
      <span className="hero-badge">
        <span className="hero-badge-dot" aria-hidden="true" />
        {t(s.badge.en, s.badge.zh)}
      </span>

      <h1 className="hero-h1">
        {t(s.line1.en, s.line1.zh)}
        <span className="hero-h1-accent">{t(s.line2.en, s.line2.zh)}</span>
      </h1>

      <p className="hero-desc">{t(s.desc.en, s.desc.zh)}</p>

      <div className="hero-actions">
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
          {t(s.viewGitHub.en, s.viewGitHub.zh)}
        </a>
      </div>
    </section>
  )
}
