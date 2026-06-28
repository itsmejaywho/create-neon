import { useEffect, useState } from 'react'
import FaqPage from '../pages/FaqPage'
import LandingPage from '../pages/LandingPage'
import SettingsPage from '../pages/SettingsPage'
import ScrollToTopButton from '../components/layout/ScrollToTopButton'
import { ROUTES } from '../constants/routes'

const SESSION_KEY = 'create-neon-user'
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000
const FAQ_PATH = '/faq'

function isFaqPath(path) {
  return path === FAQ_PATH || path.startsWith(`${FAQ_PATH}/`)
}

function isAdminUser(user) {
  return user?.username === 'admin' && user?.role === 'admin'
}

function readSession() {
  try {
    const savedSession = window.localStorage.getItem(SESSION_KEY)

    if (!savedSession) {
      return null
    }

    const session = JSON.parse(savedSession)
    const isValidSession =
      isAdminUser(session.user) &&
      typeof session.expiresAt === 'number' &&
      session.expiresAt > Date.now()

    if (!isValidSession) {
      window.localStorage.removeItem(SESSION_KEY)
      return null
    }

    return session
  } catch {
    window.localStorage.removeItem(SESSION_KEY)
    return null
  }
}

function createSession(user) {
  return {
    user,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  }
}

function getAllowedPath(session) {
  const path = window.location.pathname
  const isProtectedPath =
    path === ROUTES.settings || path === ROUTES.dashboard

  if (path === ROUTES.home && session) {
    window.history.replaceState({}, '', ROUTES.settings)
    return ROUTES.settings
  }

  if (isProtectedPath && !session) {
    window.history.replaceState({}, '', ROUTES.home)
    return ROUTES.home
  }

  if (path === ROUTES.dashboard && session) {
    window.history.replaceState({}, '', ROUTES.settings)
    return ROUTES.settings
  }

  return path
}

export default function App() {
  const [session, setSession] = useState(readSession)
  const [currentPath, setCurrentPath] = useState(() =>
    getAllowedPath(readSession()),
  )
  const isProtectedRoute = currentPath === ROUTES.settings

  useEffect(() => {
    function handlePopState() {
      const nextSession = readSession()
      setSession(nextSession)
      setCurrentPath(getAllowedPath(nextSession))
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  function navigate(path, { replace = false } = {}) {
    if (replace) {
      window.history.replaceState({}, '', path)
    } else {
      window.history.pushState({}, '', path)
    }

    setCurrentPath(path)
  }

  function handleLogin(authenticatedUser) {
    if (!isAdminUser(authenticatedUser)) {
      return false
    }

    const nextSession = createSession(authenticatedUser)
    setSession(nextSession)
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession))
    navigate(ROUTES.settings, { replace: true })
    return true
  }

  function handleLogout() {
    setSession(null)
    window.localStorage.removeItem(SESSION_KEY)
    navigate(ROUTES.home)
  }

  let page = <LandingPage onLogin={handleLogin} />

  if (isProtectedRoute && session) {
    page = <SettingsPage user={session.user} onLogout={handleLogout} />
  } else if (isFaqPath(currentPath)) {
    page = <FaqPage onLogin={handleLogin} />
  }

  return (
    <>
      {page}
      <ScrollToTopButton />
    </>
  )
}
