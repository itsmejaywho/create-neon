import HeroSection from './sections/HeroSection'
import OverviewSection from './sections/OverviewSection'
import BestShowcaseSection from './sections/BestShowcaseSection'
import LatestWorkSection from './sections/LatestWorkSection'

export default function Body() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <OverviewSection />
      <BestShowcaseSection />
      <LatestWorkSection />
    </main>
  )
}
