import { useEffect, useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import loginImage from '../../assets/image/loginImage.png'
import { verifyUserPassword } from '../../lib/supabaseAuth'

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  async function handleSubmit(event) {
    event.preventDefault()
    setStatusMessage('')
    setIsSubmitting(true)

    try {
      const user = await verifyUserPassword({
        username: username.trim(),
        password,
      })

      if (!user) {
        setStatusMessage('Invalid username or password.')
        return
      }

      if (user.role !== 'admin') {
        setStatusMessage('You do not have access to this page.')
        return
      }

      onClose()
      const loggedIn = onLogin(user)

      if (!loggedIn) {
        setStatusMessage('You do not have access to this page.')
      }
    } catch (error) {
      setStatusMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-[2px]"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close login modal"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="relative grid max-h-[min(44rem,calc(100vh-2rem))] w-full max-w-4xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:rounded-[2rem] lg:grid-cols-[0.92fr_1.08fr]"
      >
        <button
          type="button"
          aria-label="Close login modal"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-[#2f2f2f] transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f2f2f]"
        >
          <X size={22} strokeWidth={2.6} />
        </button>

        <div className="flex min-h-0 items-center justify-center overflow-y-auto px-6 py-10 sm:px-10 lg:px-12">
          <form
            className="w-full max-w-sm"
            aria-label="Login form"
            onSubmit={handleSubmit}
          >
            <div className="mb-6 text-center">
              <p className="mx-auto mb-3 grid h-8 w-8 place-items-center rounded-full bg-[black] text-base font-black text-white">
                A
              </p>
              <h2
                id="login-modal-title"
                className="text-2xl font-bold tracking-[-0.04em] text-[#2f2f2f] sm:text-3xl"
              >
                Welcome to All About Neon
              </h2>
            </div>

            <label className="block text-xs font-semibold text-[#333]">
              Username
              <input
                type="text"
                name="username"
                autoComplete="username"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="mt-1 h-11 w-full rounded-2xl border border-[#d7d7d7] bg-white px-4 text-sm font-medium text-[#2f2f2f] outline-none transition placeholder:text-[#777] focus:border-[#64b5f6] focus:ring-4 focus:ring-[#64b5f6]/35"
              />
            </label>

            <label className="mt-3 block text-xs font-semibold text-[#333]">
              Password
              <span className="relative mt-1 block">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="h-11 w-full rounded-2xl border border-[#d7d7d7] bg-white px-4 pr-11 text-sm font-medium text-[#2f2f2f] outline-none transition placeholder:text-[#777] focus:border-[#64b5f6] focus:ring-4 focus:ring-[#64b5f6]/35"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() =>
                    setShowPassword((currentValue) => !currentValue)
                  }
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-[#333] transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" size={15} strokeWidth={2} />
                  ) : (
                    <Eye aria-hidden="true" size={15} strokeWidth={2} />
                  )}
                </button>
              </span>
            </label>

            <a
              href="#"
              className="mt-2 inline-block text-xs font-bold text-[#333] transition hover:text-[#00a84f]"
            >
              Forgot your password?
            </a>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 h-11 w-full rounded-full bg-[#00ED64] text-sm font-bold text-[#001E2B] transition hover:bg-[#12ff78] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ED64]"
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>

            {statusMessage && (
              <p className="mt-3 text-center text-xs font-bold text-red-600">
                {statusMessage}
              </p>
            )}

            <div className="my-3 text-center text-xs font-bold text-[#333]">
              OR
            </div>

            <button
              type="button"
              className="flex h-10 w-full items-center justify-center gap-3 rounded-full border border-[#dedede] bg-white text-xs font-semibold text-[#333] transition hover:bg-[#f7f7f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7d7d7]"
            >
              <span className="text-base font-black text-[#4285F4]">G</span>
              Continue with Google
            </button>

            <p className="mx-auto mt-4 max-w-[17rem] text-center text-[0.62rem] font-medium leading-4 text-[#777]">
              By continuing, you agree to All About Neon&apos;s Terms of Service
              and acknowledge our Privacy Policy.
            </p>

            <div className="mt-4 space-y-1 text-center text-xs font-bold text-[#333]">
              <p>
                Not on All About Neon yet?{' '}
                <a href="#" className="hover:text-[#00a84f]">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden min-h-full items-center justify-center p-8 lg:flex">
          <img
            src={loginImage}
            alt="Decorative login illustration"
            className="h-auto max-h-[34rem] w-full object-contain"
          />
        </div>
      </section>
    </div>
  )
}
