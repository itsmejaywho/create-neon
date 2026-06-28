import { useEffect, useState } from 'react'
import { CreditCard, Pencil, ScrollText, UserRound, X } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const navItems = [
  {
    id: 'account',
    label: 'Account Info',
    description: 'The users can update their profile simply.',
    icon: UserRound,
  },
  {
    id: 'payment',
    label: 'Payment Details',
    description: 'It helps to securely manage cards & billing.',
    icon: CreditCard,
  },
  {
    id: 'terms',
    label: 'Terms of Service',
    description: 'Clear, simple policies for a smooth experience.',
    icon: ScrollText,
  },
]

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function Field({ label, value, prefix }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-black">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex h-11 flex-1 items-center gap-2 rounded-lg border border-[#e4e4e4] px-3 text-sm text-[#3a3a3a]">
          {prefix && (
            <span className="shrink-0 text-base leading-none">{prefix}</span>
          )}
          <span className="min-w-0 flex-1 truncate">{value}</span>
        </div>
        <button
          type="button"
          aria-label={`Edit ${label}`}
          className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-lg bg-[#f4f4f4] text-[#6b6b6b] transition-colors duration-200 hover:bg-[#ececec] hover:text-black"
        >
          <Pencil size={16} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  )
}

function AccountInfoPanel() {
  const fullName = 'Eldora Starling'

  return (
    <>
      <section>
        <h3 className="text-lg font-bold">Profile</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#8a8a8a]">
          View and edit your personal profile information, including your name,
          profile picture, and role within the organization.
        </p>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#2f2f2f] text-sm font-semibold text-white">
              {getInitials(fullName)}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-black">
                {fullName}
              </span>
              <span className="truncate text-sm text-[#8a8a8a]">
                Project Manager
              </span>
            </span>
          </div>
          <button
            type="button"
            aria-label="Edit profile"
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-lg bg-[#f4f4f4] text-[#6b6b6b] transition-colors duration-200 hover:bg-[#ececec] hover:text-black"
          >
            <Pencil size={16} strokeWidth={1.8} />
          </button>
        </div>
      </section>

      <section className="mt-7 border-t border-[#f0f0f0] pt-6">
        <h3 className="text-lg font-bold">Personal Information</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#8a8a8a]">
          Manage your information details, including username, birthday, email
          address, and phone number, to ensure your account is up to date.
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Username" value="eldora.s" />
          <Field label="Birthday" value="June 5, 2007" />
          <Field label="Email" value="eldora.starling@mail.com" />
          <Field label="Phone Number" value="+1 (555) 748-2296" />
        </div>
      </section>

      <section className="mt-7 border-t border-[#f0f0f0] pt-6">
        <h3 className="text-lg font-bold">Account</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#8a8a8a]">
          Update your password and select your preferred language for a
          personalized experience.
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Password" value="••••••••" />
          <Field label="Language" value="English" prefix="🇺🇸" />
        </div>
      </section>
    </>
  )
}

function PaymentDetailsPanel() {
  return (
    <>
      <section>
        <h3 className="text-lg font-bold">Payment Details</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#8a8a8a]">
          Securely manage your saved cards and billing information used for
          purchases and subscriptions.
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-[#e4e4e4] p-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-16 shrink-0 place-items-center rounded-md bg-[#1f2440] text-xs font-bold uppercase tracking-wide text-white">
              Visa
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold text-black">
                •••• •••• •••• 4242
              </span>
              <span className="truncate text-sm text-[#8a8a8a]">
                Expires 08 / 27
              </span>
            </span>
          </div>
          <button
            type="button"
            aria-label="Edit card"
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-lg bg-[#f4f4f4] text-[#6b6b6b] transition-colors duration-200 hover:bg-[#ececec] hover:text-black"
          >
            <Pencil size={16} strokeWidth={1.8} />
          </button>
        </div>
      </section>

      <section className="mt-7 border-t border-[#f0f0f0] pt-6">
        <h3 className="text-lg font-bold">Billing Information</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#8a8a8a]">
          This information appears on your invoices and is used to verify your
          payment method.
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Name on card" value="Eldora Starling" />
          <Field label="Billing email" value="billing@mail.com" />
          <Field label="Country" value="United States" prefix="🇺🇸" />
          <Field label="Postal code" value="98101" />
        </div>
      </section>
    </>
  )
}

function TermsPanel() {
  return (
    <section>
      <h3 className="text-lg font-bold">Terms of Service</h3>
      <p className="mt-1 text-sm leading-relaxed text-[#8a8a8a]">
        Clear, simple policies for a smooth experience. Please review how you
        can use the service and what you can expect from us.
      </p>

      <div className="mt-5 space-y-5 text-sm leading-relaxed text-[#3a3a3a]">
        <div>
          <h4 className="text-base font-semibold text-black">1. Using our service</h4>
          <p className="mt-1 text-[#6b6b6b]">
            You agree to use the platform responsibly and only for lawful
            purposes. You are responsible for keeping your account credentials
            secure.
          </p>
        </div>
        <div>
          <h4 className="text-base font-semibold text-black">2. Billing & subscriptions</h4>
          <p className="mt-1 text-[#6b6b6b]">
            Paid plans renew automatically until cancelled. You can manage or
            cancel your subscription at any time from your account settings.
          </p>
        </div>
        <div>
          <h4 className="text-base font-semibold text-black">3. Privacy</h4>
          <p className="mt-1 text-[#6b6b6b]">
            We handle your data according to our privacy policy and never sell
            your personal information to third parties.
          </p>
        </div>
        <div>
          <h4 className="text-base font-semibold text-black">4. Changes to these terms</h4>
          <p className="mt-1 text-[#6b6b6b]">
            We may update these terms occasionally. We will notify you of
            significant changes before they take effect.
          </p>
        </div>
      </div>
    </section>
  )
}

function SettingsSkeleton() {
  return (
    <>
      <section>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-3 h-4 w-3/4" />

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-11 w-11 rounded-lg" />
        </div>
      </section>

      <section className="mt-7 border-t border-[#f0f0f0] pt-6">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="mt-3 h-4 w-5/6" />

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="mb-2 h-3.5 w-24" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7 border-t border-[#f0f0f0] pt-6">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="mt-3 h-4 w-2/3" />

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="mb-2 h-3.5 w-24" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default function SettingsModal({ open, onClose }) {
  const [activeId, setActiveId] = useState('account')
  const [loading, setLoading] = useState(false)

  // Show the same loading treatment whenever the modal opens
  // or the user switches between settings sections.
  useEffect(() => {
    if (!open) {
      setLoading(false)
      return undefined
    }

    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timeout)
  }, [activeId, open])

  useEffect(() => {
    if (!open) {
      setActiveId('account')
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    function handleKey(event) {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return (
    <div
      aria-hidden={!open}
      className={[
        'fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 transition-opacity duration-300 ease-out',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        onMouseDown={(event) => event.stopPropagation()}
        className={[
          'flex h-[86vh] max-h-[800px] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          open
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-2 scale-95 opacity-0',
        ].join(' ')}
      >
        {/* Left nav */}
        <div className="hidden w-72 shrink-0 flex-col border-r border-[#f0f0f0] p-4 sm:flex">
          <h2 className="px-3 pb-4 pt-1 text-xl font-bold">Settings</h2>
          <nav className="flex flex-col gap-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = activeId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={[
                    'flex w-full cursor-pointer items-start gap-3 rounded-xl p-3 text-left transition-colors duration-200',
                    active ? 'bg-[#f3f1ff]' : 'hover:bg-[#f6f6f6]',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg',
                      active
                        ? 'bg-[#4146F8] text-white'
                        : 'bg-[#f4f4f4] text-[#6b6b6b]',
                    ].join(' ')}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span
                      className={[
                        'text-sm font-semibold',
                        active ? 'text-[#4146F8]' : 'text-black',
                      ].join(' ')}
                    >
                      {item.label}
                    </span>
                    <span className="mt-0.5 text-xs leading-snug text-[#8a8a8a]">
                      {item.description}
                    </span>
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Right panel */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-end border-b border-[#f0f0f0] px-6 py-3">
            <button
              type="button"
              aria-label="Close settings"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg text-[#8a8a8a] transition-colors duration-200 hover:bg-[#f6f6f6] hover:text-black"
            >
              <X size={18} strokeWidth={1.8} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            {loading ? (
              <SettingsSkeleton />
            ) : (
              <>
                {activeId === 'account' && <AccountInfoPanel />}
                {activeId === 'payment' && <PaymentDetailsPanel />}
                {activeId === 'terms' && <TermsPanel />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
