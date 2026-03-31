import { LangProvider } from '../context/LangContext'
import { ThemeProvider } from '../context/ThemeContext'
import { BrainstormSection } from '../sections/BrainstormSection'
import { CtaSection } from '../sections/CtaSection'
import { HeroSection } from '../sections/HeroSection'
import { MemorySection } from '../sections/MemorySection'
import { UseCasesSection } from '../sections/UseCasesSection'
import { Nav } from './Nav'

export function HomePage() {
  return (
    <ThemeProvider>
      <LangProvider>
        <div className="page-shell">
          <Nav />
          <main>
            <HeroSection />
            <MemorySection />
            <BrainstormSection />
            <UseCasesSection />
            <CtaSection />
          </main>
        </div>
      </LangProvider>
    </ThemeProvider>
  )
}
