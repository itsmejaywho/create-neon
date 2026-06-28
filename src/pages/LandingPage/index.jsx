import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import LandingHero from './Body'

export default function LandingPage({ currentPath, navigate, onLogin }) {
  return (
    <div>
      <Navbar onLogin={onLogin} />
      <LandingHero currentPath={currentPath} navigate={navigate} />
      <Footer />
    </div>
  )
}
