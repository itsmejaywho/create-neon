import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  Contact,
  CreditCard,
  FileText,
  Globe2,
  LayoutDashboard,
  Link2,
  Mail,
  Search,
  Settings,
  ShieldCheck,
  SquareKanban,
  Users,
  Wrench,
} from 'lucide-react'

const mainNavSections = [
  {
    items: [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Notifications', icon: Bell },
      { label: 'Notes', icon: FileText },
      { label: 'Tasks', icon: SquareKanban },
      { label: 'Emails', icon: Mail, endIcon: ChevronDown },
      { label: 'Calendars', icon: CalendarDays },
    ],
  },
  {
    title: 'Database',
    items: [
      { label: 'Analytics', icon: BarChart3 },
      { label: 'Contacts', icon: Contact },
      { label: 'Companies', icon: Building2 },
    ],
  },
  {
    items: [
      { label: 'Integrations', icon: Link2 },
      { label: 'Settings', icon: Settings, active: true },
    ],
  },
]

const settingsSections = [
  {
    title: 'General Settings',
    items: [
      { label: 'Apps', icon: Wrench },
      { label: 'Account', icon: ShieldCheck, active: true },
      { label: 'Notification', icon: Bell },
      { label: 'Language & Region', icon: Globe2 },
    ],
  },
  {
    title: 'Workspace Settings',
    items: [
      { label: 'General', icon: Settings },
      { label: 'Members', icon: Users },
      { label: 'Billing', icon: CreditCard },
    ],
  },
]

function NavItem({ item }) {
  const Icon = item.icon
  const EndIcon = item.endIcon

  return (
    <button
      type="button"
      className={[
        'flex h-9 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition',
        item.active
          ? 'bg-[#eeeeee] text-black'
          : 'text-[#4d4d4d] hover:bg-[#f2f2f2] hover:text-black',
      ].join(' ')}
    >
      <Icon size={16} strokeWidth={1.7} />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {EndIcon && <EndIcon size={15} strokeWidth={1.7} />}
    </button>
  )
}

function Toggle({ enabled = true }) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      className={[
        'relative h-6 w-11 rounded-full transition',
        enabled ? 'bg-black' : 'bg-[#d8d8d8]',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1 h-4 w-4 rounded-full bg-white transition',
          enabled ? 'left-6' : 'left-1',
        ].join(' ')}
      />
    </button>
  )
}

function AccountField({ label, value, disabled = false }) {
  return (
    <label className="block text-sm font-semibold text-black">
      {label}
      <input
        type="text"
        value={value}
        disabled={disabled}
        readOnly
        className={[
          'mt-2 h-10 w-full rounded border border-[#cfcfcf] px-3 text-sm font-medium outline-none',
          disabled ? 'bg-[#f5f5f5] text-[#b0b0b0]' : 'bg-white text-black',
        ].join(' ')}
      />
    </label>
  )
}

export default function SettingsPage({ user, onLogout }) {
  const displayName = user?.username ?? 'admin'

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[14rem_1fr] xl:grid-cols-[15rem_16rem_1fr]">
        <aside className="hidden border-r border-[#e5e5e5] bg-[#f8f8f8] md:flex md:flex-col">
          <div className="flex h-14 items-center gap-2 border-b border-[#e5e5e5] px-5">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-black text-[0.62rem] font-black text-white">
              A
            </div>
            <span className="text-base font-bold">All About Neon</span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-between">
            <nav className="space-y-5 px-3 py-5">
              {mainNavSections.map((section, sectionIndex) => (
                <div
                  key={section.title ?? `section-${sectionIndex}`}
                  className="space-y-1"
                >
                  {section.title && (
                    <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-wide text-[#7b7b7b]">
                      {section.title}
                    </p>
                  )}
                  {section.items.map((item) => (
                    <NavItem key={item.label} item={item} />
                  ))}
                </div>
              ))}
            </nav>

            <button
              type="button"
              className="m-3 flex h-11 items-center justify-between rounded-md px-3 text-sm font-semibold text-black hover:bg-[#eeeeee]"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-sm bg-white text-xs shadow-sm">
                  M
                </span>
                Admin Team
              </span>
              <ChevronDown size={15} strokeWidth={1.8} />
            </button>
          </div>
        </aside>

        <section className="hidden border-r border-[#e5e5e5] bg-white xl:block">
          <div className="h-14 border-b border-[#e5e5e5]" />
          <nav className="space-y-7 px-4 py-6">
            {settingsSections.map((section) => (
              <div key={section.title}>
                <p className="mb-3 px-2 text-[0.62rem] font-semibold uppercase tracking-wide text-[#8a8a8a]">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavItem key={item.label} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </section>

        <section className="min-w-0">
          <header className="flex h-14 items-center justify-between border-b border-[#e5e5e5] px-4 md:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="relative hidden w-full max-w-md sm:block">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]"
                  size={16}
                  strokeWidth={1.8}
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="h-9 w-full rounded border border-[#d8d8d8] bg-white pl-9 pr-20 text-sm outline-none focus:border-black"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[#d8d8d8] px-2 py-0.5 text-xs font-semibold text-[#777]">
                  F
                </kbd>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <span className="hidden items-center gap-2 text-sm font-medium text-[#555] sm:flex">
                <CircleHelp size={16} strokeWidth={1.8} />
                Help Center
              </span>
              <button
                type="button"
                className="flex items-center gap-3 text-sm font-semibold text-black"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#141414] text-xs font-bold text-white">
                  A
                </span>
                <span className="hidden sm:inline">{displayName}</span>
                <ChevronDown size={15} strokeWidth={1.8} />
              </button>
            </div>
          </header>

          <div className="border-b border-[#e5e5e5] px-4 py-5 md:px-8">
            <h1 className="text-2xl font-bold">Account Settings</h1>
          </div>

          <div className="mx-auto max-w-5xl px-4 py-7 md:px-8">
            <section>
              <h2 className="border-b border-[#e2e2e2] pb-3 text-xl font-bold">
                My Profile
              </h2>

              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#111] text-xl font-bold text-white">
                  A
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="h-9 rounded bg-black px-5 text-sm font-semibold text-white"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    className="h-9 rounded bg-[#f2f2f2] px-5 text-sm font-semibold text-black hover:bg-[#e9e9e9]"
                  >
                    Remove Image
                  </button>
                  <p className="basis-full text-xs font-medium text-[#777]">
                    We support PNGs, JPEGs and GIFs under 2MB
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <AccountField label="First Name" value="Admin" />
                <AccountField label="Last Name" value="User" />
              </div>
            </section>

            <section className="mt-8">
              <h2 className="border-b border-[#e2e2e2] pb-3 text-xl font-bold">
                Account Security
              </h2>

              <div className="mt-5 space-y-5">
                <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                  <AccountField
                    label="Email"
                    value="admin@allaboutneon.com"
                    disabled
                  />
                  <button
                    type="button"
                    className="h-10 rounded bg-[#f2f2f2] px-4 text-sm font-semibold text-black hover:bg-[#e9e9e9]"
                  >
                    Change email
                  </button>
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                  <AccountField label="Password" value="************" disabled />
                  <button
                    type="button"
                    className="h-10 rounded bg-[#f2f2f2] px-4 text-sm font-semibold text-black hover:bg-[#e9e9e9]"
                  >
                    Change password
                  </button>
                </div>

                <div className="flex items-center justify-between gap-5">
                  <div>
                    <h3 className="text-base font-bold">
                      2-Step Verification
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#777]">
                      Add an additional layer of security to your account during
                      login.
                    </p>
                  </div>
                  <Toggle />
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="border-b border-[#e2e2e2] pb-3 text-xl font-bold">
                Support Access
              </h2>

              <div className="mt-5 space-y-5">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <h3 className="text-base font-bold">Support access</h3>
                    <p className="mt-1 text-sm font-medium text-[#777]">
                      Support access is enabled for account troubleshooting.
                    </p>
                  </div>
                  <Toggle />
                </div>

                <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h3 className="text-base font-bold">
                      Log out of all devices
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#777]">
                      Log out of all other active sessions besides this one.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="h-10 rounded bg-[#f2f2f2] px-4 text-sm font-semibold text-black hover:bg-[#e9e9e9]"
                  >
                    Log out
                  </button>
                </div>

                <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h3 className="text-base font-bold text-[#b42318]">
                      Delete my account
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#777]">
                      Permanently delete the account and remove access from all
                      workspaces.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="h-10 rounded bg-[#f2f2f2] px-4 text-sm font-semibold text-black hover:bg-[#e9e9e9]"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
