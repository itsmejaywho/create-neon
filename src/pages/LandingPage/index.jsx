import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import LandingHero from './Body'

export default function LandingPage({ onLogin }) {
  return (
    <div>
      <Navbar onLogin={onLogin} />
      <LandingHero />
      <Footer />
    </div>
  )
}
