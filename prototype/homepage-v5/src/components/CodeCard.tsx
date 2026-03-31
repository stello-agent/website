import { useState } from 'react'

interface Tab {
  name: string
  language: string
  code: string
}

interface CodeCardProps {
  title: string
  description: string
  tabs: Tab[]
  activeTabIndex?: number
  onTabChange?: (index: number) => void
}

export function CodeCard({
  title,
  description,
  tabs,
  activeTabIndex,
  onTabChange,
}: CodeCardProps) {
  const [internalTab, setInternalTab] = useState(0)
  const currentTab = activeTabIndex ?? internalTab
  const setTab = onTabChange ?? setInternalTab

  return (
    <div style={styles.container}>
      {/* Upper: title + description in glass panel */}
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>

      {/* Lower: file tabs + code — glass panel */}
      <div style={styles.codeArea}>
        <div style={styles.tabBar}>
          {tabs.map((tab, i) => (
            <button
              key={tab.name}
              style={{
                ...styles.tab,
                ...(currentTab === i ? styles.tabActive : {}),
              }}
              onClick={() => setTab(i)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <pre style={styles.codeBlock}>
          <code>{tabs[currentTab]?.code ?? ''}</code>
        </pre>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    flex: 1,
  },
  header: {
    padding: '24px 28px',
    borderRadius: 18,
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  title: {
    fontSize: 21,
    fontWeight: 600,
    color: '#f1f5f9',
    margin: '0 0 10px',
    letterSpacing: '-0.3px',
  },
  description: {
    fontSize: 14,
    lineHeight: 1.75,
    color: '#94a3b8',
    margin: 0,
  },
  codeArea: {
    borderRadius: 18,
    background: 'rgba(15, 16, 34, 0.7)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
    overflow: 'hidden',
    flex: 1,
  },
  tabBar: {
    display: 'flex',
    gap: 0,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(255,255,255,0.02)',
    overflowX: 'auto',
    padding: '0 4px',
  },
  tab: {
    padding: '11px 16px',
    fontSize: 12.5,
    fontFamily: '"JetBrains Mono", monospace',
    color: '#64748b',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    borderRadius: '8px 8px 0 0',
  },
  tabActive: {
    color: '#e2e8f0',
    borderBottomColor: '#3b82f6',
    background: 'rgba(59, 130, 246, 0.06)',
  },
  codeBlock: {
    margin: 0,
    padding: '18px 22px',
    fontSize: 12.5,
    lineHeight: 1.75,
    fontFamily: '"JetBrains Mono", monospace',
    color: '#94a3b8',
    overflowX: 'auto',
    maxHeight: 340,
    overflowY: 'auto',
  },
}
