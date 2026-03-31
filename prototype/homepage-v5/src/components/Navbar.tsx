import { Star } from 'lucide-react'

const navLinks = [
  { label: 'Overview', href: '#' },
  { label: 'Docs', href: 'https://github.com/stello-agent/stello/tree/main/docs' },
  { label: 'Blog', href: '#' },
  { label: 'Cases', href: '#usecases' },
]

export function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <a href="#" style={styles.logo}>
          <StelloLogo />
          <span style={styles.logoText}>Stello</span>
        </a>

        <div style={styles.links}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} style={styles.link}>
              {link.label}
            </a>
          ))}
        </div>

        <div style={styles.actions}>
          <a
            href="https://github.com/stello-agent/stello"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.githubBtn}
          >
            <Star size={14} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

function StelloLogo() {
  return (
    <svg width="28" height="28" viewBox="44 38 114 124" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="100,68 107,88 118,82 110,93 130,100 110,107 118,118 107,112 100,132 93,112 82,118 90,107 70,100 90,93 82,82 93,88"
        fill="#3b82f6"
      />
      <circle cx="100" cy="58" r="2.5" fill="#3b82f6" opacity="0.6" />
      <circle cx="120" cy="62" r="2" fill="#3b82f6" opacity="0.4" />
      <circle cx="136" cy="74" r="2.2" fill="#3b82f6" opacity="0.5" />
      <circle cx="140" cy="92" r="2" fill="#3b82f6" opacity="0.3" />
      <circle cx="142" cy="108" r="2.3" fill="#3b82f6" opacity="0.5" />
      <circle cx="134" cy="124" r="2" fill="#3b82f6" opacity="0.4" />
      <circle cx="64" cy="82" r="2.3" fill="#3b82f6" opacity="0.5" />
      <circle cx="76" cy="70" r="2" fill="#3b82f6" opacity="0.4" />
    </svg>
  )
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'rgba(10, 11, 20, 0.6)',
    backdropFilter: 'blur(40px) saturate(200%)',
    WebkitBackdropFilter: 'blur(40px) saturate(200%)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: '#e2e8f0',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '-0.5px',
  },
  links: {
    display: 'flex',
    gap: 32,
  },
  link: {
    fontSize: 14,
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  actions: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  },
  githubBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    borderRadius: 10,
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.2s',
  },
}
