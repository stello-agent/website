import { LangProvider } from '../context/LangContext'
import { ThemeProvider, useThemeContext } from '../context/ThemeContext'
import { BrainstormSection } from '../sections/BrainstormSection'
import { CtaSection } from '../sections/CtaSection'
import { HeroSection } from '../sections/HeroSection'
import { OverviewSection } from '../sections/OverviewSection'
import { ProductOverviewSection } from '../sections/ProductOverviewSection'
import { UseCasesSection } from '../sections/UseCasesSection'
import { Nav } from './Nav'
import { ParticleBackground } from './ParticleBackground'
import { SectionConnector } from './SectionConnector'

function PageContent() {
  const { theme } = useThemeContext()
  return (
    <div className="page-shell">
      <ParticleBackground theme={theme} />
      <SectionConnector theme={theme} />
      <Nav />
      <main>
        <HeroSection />
        <OverviewSection />
        <BrainstormSection />
        <ProductOverviewSection />
        <UseCasesSection />
        <CtaSection />
      </main>
    </div>
  )
}

export function HomePage() {
  return (
    <ThemeProvider>
      <LangProvider>
        <PageContent />
      </LangProvider>
    </ThemeProvider>
  )
}
