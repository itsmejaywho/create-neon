import HeroSection from './sections/HeroSection'
import OverviewSection from './sections/OverviewSection'

export default function Body() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <OverviewSection />
    </main>
  )
}
