import { useState } from 'react'
import { ArrowRight, Star, Mail, Copy, Check } from 'lucide-react'

export function CTASection() {
  const [copied, setCopied] = useState(false)
  const installCmd = 'npm install @stello-ai/core'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="cta" style={styles.section}>
      <div style={styles.inner}>
        <h2 style={styles.title}>开始构建你的认知拓扑</h2>
        <p style={styles.subtitle}>开源、免费、Apache-2.0。</p>
        <p style={styles.desc}>
          不绑定 LLM / 存储 / UI，完全解耦架构。从单 Session 到完整拓扑，渐进式采用。
        </p>

        {/* Terminal — glass style */}
        <div style={styles.terminal}>
          <div style={styles.terminalHeader}>
            <div style={styles.terminalDots}>
              <span style={{ ...styles.dot, background: '#ef4444' }} />
              <span style={{ ...styles.dot, background: '#eab308' }} />
              <span style={{ ...styles.dot, background: '#22c55e' }} />
            </div>
            <button style={styles.copyBtn} onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <div style={styles.terminalBody}>
            <span style={styles.prompt}>$</span>
            <span style={styles.cmd}>{installCmd}</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.buttons}>
          <a
            href="https://github.com/stello-agent/stello/tree/main/docs"
            style={styles.btnPrimary}
          >
            快速开始 <ArrowRight size={16} />
          </a>
          <a
            href="https://github.com/stello-agent/stello"
            target="_blank"
            rel="noopener"
            style={styles.btnSecondary}
          >
            <Star size={16} /> 在 GitHub 上 Star
          </a>
          <a href="mailto:contact@stello.ai" style={styles.btnTertiary}>
            <Mail size={14} /> 联系我们
          </a>
        </div>

        {/* Community */}
        <div style={styles.community}>
          <a
            href="https://github.com/stello-agent/stello"
            target="_blank"
            rel="noopener"
            style={styles.communityLink}
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
          <a href="#" style={styles.communityLink}>
            <DiscordIcon />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  )
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '100px 24px 80px',
    background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.03) 50%, transparent 100%)',
  },
  inner: {
    maxWidth: 640,
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    color: '#f1f5f9',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: 18,
    color: '#94a3b8',
    margin: 0,
  },
  desc: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 1.7,
    maxWidth: 480,
    margin: 0,
  },
  terminal: {
    width: '100%',
    maxWidth: 460,
    borderRadius: 16,
    background: 'rgba(15, 16, 34, 0.65)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
    overflow: 'hidden',
    margin: '8px 0',
  },
  terminalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.02)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  terminalDots: {
    display: 'flex',
    gap: 7,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: '50%',
  },
  copyBtn: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 8,
    color: '#64748b',
    cursor: 'pointer',
    padding: '5px 8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  terminalBody: {
    padding: '18px 22px',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 14,
    display: 'flex',
    gap: 10,
  },
  prompt: {
    color: '#22c55e',
    fontWeight: 600,
  },
  cmd: {
    color: '#e2e8f0',
  },
  buttons: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 4,
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 28px',
    borderRadius: 12,
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: '#fff',
    fontSize: 15,
    fontWeight: 600,
    textDecoration: 'none',
    boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: 500,
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  btnTertiary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '12px 20px',
    borderRadius: 12,
    color: '#94a3b8',
    fontSize: 14,
    textDecoration: 'none',
  },
  community: {
    display: 'flex',
    gap: 24,
    marginTop: 12,
  },
  communityLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#64748b',
    fontSize: 14,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
}
