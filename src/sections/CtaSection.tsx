// src/sections/CtaSection.tsx
import { useState } from 'react'
import { strings } from '../data/i18n'
import { useLang } from '../hooks/useLang'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const INSTALL_CMD = 'npm install @stello-ai/core'

export function CtaSection() {
  const { t } = useLang()
  const s = strings.cta
  const [copied, setCopied] = useState(false)
  const [sectionRef, visible] = useIntersectionObserver<HTMLElement>()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      ref={sectionRef}
      className={`cta-section animate-in${visible ? ' visible' : ''}`}
    >
      <div className="cta-inner">
        <h2 className="cta-title">{t(s.title.en, s.title.zh)}</h2>
        <p className="cta-subtitle-line">{t(s.subtitle.en, s.subtitle.zh)}</p>
        <p className="cta-desc">{t(s.sellingPoints.en, s.sellingPoints.zh)}</p>

        {/* Glass terminal */}
        <div className="cta-terminal cta-terminal--glass">
          <div className="cta-terminal-titlebar" aria-hidden="true">
            <span className="cta-terminal-dots">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className="cta-terminal-body">
            <span className="cta-terminal-prompt">$</span>
            <code className="cta-terminal-cmd">{INSTALL_CMD}</code>
            <button
              type="button"
              className="cta-copy-btn"
              onClick={handleCopy}
              aria-label="Copy install command"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="cta-actions">
          <a className="hero-btn hero-btn--primary" href="https://stello-agent.github.io/docs" target="_blank" rel="noopener noreferrer">
            {t(s.quickStart.en, s.quickStart.zh)}
          </a>
          <a
            className="hero-btn hero-btn--secondary"
            href="https://github.com/stello-agent/stello"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {t(s.star.en, s.star.zh)}
          </a>
          <a className="hero-btn hero-btn--tertiary" href="mailto:contact@stello.ai">
            {t(s.contact.en, s.contact.zh)}
          </a>
        </div>

        {/* Community links */}
        <div className="cta-community">
          <a
            href="https://github.com/stello-agent/stello"
            target="_blank"
            rel="noreferrer"
            className="cta-community-link"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://discord.gg/stello"
            target="_blank"
            rel="noreferrer"
            className="cta-community-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </a>
          <span className="cta-community-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.834-6.616C12.785 8.862 14.788 8 16.894 8c.158 0 .315.005.473.014-.978-3.302-4.447-5.826-8.676-5.826zm-2.34 4.307a.905.905 0 110 1.811.905.905 0 010-1.811zm4.134 0a.905.905 0 110 1.811.905.905 0 010-1.811z"/>
              <path d="M23.985 14.66c0-3.22-3.24-5.837-7.091-5.837S9.803 11.44 9.803 14.66c0 3.22 3.24 5.837 7.091 5.837.773 0 1.545-.109 2.258-.316a.723.723 0 01.602.082l1.595.938a.273.273 0 00.143.043c.125 0 .245-.11.245-.245 0-.063-.025-.121-.039-.178l-.322-1.237a.49.49 0 01.178-.559C23.001 18.27 23.985 16.576 23.985 14.66zm-9.53-1.096a.767.767 0 110 1.535.767.767 0 010-1.535zm4.878 0a.767.767 0 110 1.535.767.767 0 010-1.535z"/>
            </svg>
            {t('WeChat', '微信群')}
          </span>
        </div>

        <p className="cta-footer">{t(s.footer.en, s.footer.zh)}</p>
      </div>
    </section>
  )
}
