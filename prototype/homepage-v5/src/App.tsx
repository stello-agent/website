import { Navbar } from './components/Navbar'
import { HeroSection } from './sections/HeroSection'
import { CapabilitiesSection } from './sections/CapabilitiesSection'
import { ProductSection } from './sections/ProductSection'
import { UseCasesSection } from './sections/UseCasesSection'
import { CTASection } from './sections/CTASection'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <div style={styles.divider} />
        <CapabilitiesSection />
        <div style={styles.divider} />
        <ProductSection />
        <div style={styles.divider} />
        <UseCasesSection />
        <div style={styles.divider} />
        <CTASection />
      </main>
      <footer style={styles.footer}>
        <p>Apache-2.0 &copy; {new Date().getFullYear()} Stello Team</p>
      </footer>
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  divider: {
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)',
    maxWidth: 1200,
    margin: '0 auto',
  },
  footer: {
    textAlign: 'center',
    padding: '40px 24px',
    color: '#475569',
    fontSize: 13,
    borderTop: '1px solid rgba(255,255,255,0.04)',
  },
}

export default App
