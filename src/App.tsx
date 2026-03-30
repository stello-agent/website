import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import './App.css'

const primaryLinks = [
  { label: 'Docs', href: 'https://github.com/stello-agent/stello/tree/main/docs' },
  { label: 'GitHub', href: 'https://github.com/stello-agent/stello' },
  { label: 'Packages', href: 'https://www.npmjs.com/search?q=%40stello-ai' },
]

const branchSessions = [
  {
    title: 'Research Session',
    subtitle: 'Explore options',
    x: -310,
    y: -158,
    rotate: -10,
    delay: 0,
  },
  {
    title: 'Plan Session',
    subtitle: 'Draft structure',
    x: 0,
    y: -208,
    rotate: -2,
    delay: 0.08,
  },
  {
    title: 'Code Session',
    subtitle: 'Implement path',
    x: 314,
    y: -124,
    rotate: 11,
    delay: 0.16,
  },
  {
    title: 'Review Session',
    subtitle: 'Validate edges',
    x: 350,
    y: 142,
    rotate: 8,
    delay: 0.24,
  },
  {
    title: 'Fix Session',
    subtitle: 'Patch issues',
    x: 0,
    y: 244,
    rotate: 2,
    delay: 0.32,
  },
  {
    title: 'Write Session',
    subtitle: 'Ship output',
    x: -332,
    y: 136,
    rotate: -8,
    delay: 0.4,
  },
]

const heroSteps = [
  {
    index: '01',
    title: 'Keep one main session',
    text: 'Start with one bounded control plane that holds the overall objective.',
  },
  {
    index: '02',
    title: 'Split into focused branches',
    text: 'As complexity grows, the main session forks scoped child sessions for parallel work.',
  },
  {
    index: '03',
    title: 'Hold structure while work expands',
    text: 'Each branch stays isolated, while the main session preserves the topology.',
  },
]

const featureCards = [
  {
    title: 'Branch without context collapse',
    description:
      'Fork work into isolated sessions, keep each branch focused, and stop forcing unrelated subproblems into one chat log.',
  },
  {
    title: 'Integrate from summaries, not noise',
    description:
      'Main session reads L2 summaries instead of raw branch history, so synthesis stays stable even as the tree grows.',
  },
  {
    title: 'Push insights back down',
    description:
      'Cross-session coordination happens through targeted insights, not hidden shared memory or accidental prompt leakage.',
  },
]

const workflowSteps = [
  {
    index: '01',
    title: 'Session primitives',
    description:
      'Each session owns its own L3 history, system prompt, and consolidation lifecycle.',
  },
  {
    index: '02',
    title: 'Engine orchestration',
    description:
      'Tool-call loops, session switching, consolidation, and integration are scheduled above the session layer.',
  },
  {
    index: '03',
    title: 'Topology visibility',
    description:
      'The tree is stored independently and can be rendered as a navigable map instead of disappearing into logs.',
  },
]

const packageCards = [
  {
    name: '@stello-ai/session',
    text: 'Single-session primitives for prompt context, L2/L3 memory, and LLM adapters.',
  },
  {
    name: '@stello-ai/core',
    text: 'The orchestration layer for turns, forking, scheduling, and runtime coordination.',
  },
  {
    name: '@stello-ai/server',
    text: 'Service wrapper for REST, WebSocket, PostgreSQL persistence, and multi-tenant hosting.',
  },
  {
    name: '@stello-ai/devtools',
    text: 'Local inspection UI for topology, conversation replay, settings, and live events.',
  },
]

const metrics = [
  { value: 'L3', label: 'raw branch memory' },
  { value: 'L2', label: 'external branch summary' },
  { value: 'L1', label: 'global synthesis and state' },
]

// 计算 hero 在滚动过程中的展开进度。
function useHeroProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = sectionRef.current

    if (!node) {
      return
    }

    let ticking = false

    // 根据视口中的滚动距离计算 0-1 进度。
    const updateProgress = () => {
      ticking = false

      const rect = node.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const total = Math.max(rect.height - viewportHeight, 1)
      const next = Math.min(Math.max(-rect.top / total, 0), 1)
      setProgress(next)
    }

    // 节流 scroll 事件，避免重复布局计算。
    const onScroll = () => {
      if (ticking) {
        return
      }

      ticking = true
      window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionRef])

  return progress
}

// 渲染站点首页。
function App() {
  const heroRef = useRef<HTMLElement>(null)
  const progress = useHeroProgress(heroRef)
  const activeStep = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Stello home">
          <span className="brand-mark" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="brand-name">Stello</span>
        </a>
        <nav className="topnav" aria-label="Primary">
          {primaryLinks.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="button button-secondary topbar-cta"
          href="https://github.com/stello-agent/stello"
          target="_blank"
          rel="noreferrer"
        >
          Star on GitHub
        </a>
      </header>

      <main>
        <section ref={heroRef} className="hero-scroll-section">
          <div className="hero-sticky">
            <div className="hero-story">
              <div className="hero-story-copy">
                <span className="hero-kicker">Scroll demo</span>
                <h1>Main Session splits into multiple working sessions.</h1>
                <p>
                  This section should stay pinned while you scroll. The left side
                  explains the phase, the right side shows the topology unfolding.
                </p>

                <div className="hero-steps">
                  {heroSteps.map((step, index) => (
                    <article
                      key={step.index}
                      className={`hero-step ${activeStep === index ? 'is-active' : ''}`}
                    >
                      <span>{step.index}</span>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div
                className="hero-scene"
                style={{ '--hero-progress': progress.toFixed(4) } as CSSProperties}
              >
                <div className="hero-scene-grid"></div>
                <div className="hero-scene-glow hero-scene-glow-a"></div>
                <div className="hero-scene-glow hero-scene-glow-b"></div>

                <div className="main-session-card">
                  <span className="session-badge">Main Session</span>
                  <strong>Coordinate the whole problem</strong>
                  <span>Reads L2 summaries, integrates synthesis, pushes insights.</span>
                </div>

                <div className="session-orbits orbit-1"></div>
                <div className="session-orbits orbit-2"></div>
                <div className="session-orbits orbit-3"></div>

                {branchSessions.map((session) => (
                  <div
                    key={session.title}
                    className="branch-link"
                    style={
                      {
                        '--branch-x': `${session.x}px`,
                        '--branch-y': `${session.y}px`,
                        '--branch-rotate': `${Math.atan2(session.y, session.x)}rad`,
                        '--branch-length': `${Math.hypot(session.x, session.y)}px`,
                        '--branch-delay': session.delay,
                      } as CSSProperties
                    }
                  ></div>
                ))}

                {branchSessions.map((session) => (
                  <article
                    key={`${session.title}-card`}
                    className="branch-session-card"
                    style={
                      {
                        '--session-x': `${session.x}px`,
                        '--session-y': `${session.y}px`,
                        '--session-rotate': `${session.rotate}deg`,
                        '--session-delay': session.delay,
                      } as CSSProperties
                    }
                  >
                    <span className="session-badge">Child Session</span>
                    <strong>{session.title}</strong>
                    <span>{session.subtitle}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="metrics-section">
          {metrics.map((item) => (
            <article key={item.label} className="metric-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="section-block">
          <div className="section-heading">
            <span className="section-kicker">Why Stello</span>
            <h2>Built for systems that branch, recurse, and need clean coordination.</h2>
            <p>
              Linear chat is fine until the work stops being linear. Stello gives you
              separate execution, explicit consolidation, and a visible topology that
              survives long-running agent workflows.
            </p>
          </div>
          <div className="feature-grid">
            {featureCards.map((card) => (
              <article key={card.title} className="feature-card">
                <div className="feature-icon"></div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block workflow-section">
          <div className="section-heading narrow">
            <span className="section-kicker">How it works</span>
            <h2>Separate execution from orchestration.</h2>
          </div>
          <div className="workflow-grid">
            <div className="workflow-steps">
              {workflowSteps.map((step) => (
                <article key={step.index} className="workflow-step">
                  <span>{step.index}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="workflow-preview" aria-hidden="true">
              <div className="preview-header">
                <span className="preview-pill">Engine cycle</span>
                <span className="preview-pill muted">fire-and-forget scheduling</span>
              </div>
              <div className="preview-timeline">
                <div className="timeline-row">
                  <span>turn()</span>
                  <div className="timeline-track">
                    <i className="fill fill-1"></i>
                  </div>
                </div>
                <div className="timeline-row">
                  <span>consolidate()</span>
                  <div className="timeline-track">
                    <i className="fill fill-2"></i>
                  </div>
                </div>
                <div className="timeline-row">
                  <span>integrate()</span>
                  <div className="timeline-track">
                    <i className="fill fill-3"></i>
                  </div>
                </div>
                <div className="timeline-row">
                  <span>insights</span>
                  <div className="timeline-track">
                    <i className="fill fill-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block packages-section">
          <div className="section-heading">
            <span className="section-kicker">Packages</span>
            <h2>Everything needed to ship topology-native AI products.</h2>
          </div>
          <div className="package-grid">
            {packageCards.map((item) => (
              <article key={item.name} className="package-card">
                <span className="package-name">{item.name}</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div>
            <span className="section-kicker">Start building</span>
            <h2>Use one session when you can. Use a topology when you have to.</h2>
            <p>
              Stello is designed for the moment your agent stops fitting into one
              prompt window. Build the topology instead of fighting the transcript.
            </p>
          </div>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="https://www.npmjs.com/package/@stello-ai/core"
              target="_blank"
              rel="noreferrer"
            >
              Explore packages
            </a>
            <a
              className="button button-secondary"
              href="https://github.com/stello-agent/stello/tree/main/docs"
              target="_blank"
              rel="noreferrer"
            >
              Open docs
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
