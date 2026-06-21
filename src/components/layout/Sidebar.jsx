import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Bell,
  Box,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutGrid,
  LogOut,
  Plus,
  Search,
  Settings,
  UserRound,
  Zap,
} from 'lucide-react'
import logo from '../../assets/image/logo.png'
import SettingsModal from '../feedback/SettingsModal'

const mainNav = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutGrid,
    children: [
      { id: 'project', label: 'Project' },
      { id: 'revenue', label: 'Revenue' },
      { id: 'insights', label: 'Insights' },
    ],
  },
  { id: 'contracts', label: 'Contracts', icon: FileText },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'notification', label: 'Notification', icon: Bell },
]

const messages = [
  { id: 'esther', name: 'Esther Howard', color: '#f4b740', status: 'online' },
  { id: 'jacob', name: 'Jacob Jones', color: '#2f2f2f', status: 'busy' },
  { id: 'cody', name: 'Cody Fisher', color: '#f4b740', status: 'online' },
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

function Avatar({ name, color, size = 32, status }) {
  return (
    <span className="relative inline-flex shrink-0">
      <span
        className="grid place-items-center rounded-full text-[0.7rem] font-semibold text-white"
        style={{ width: size, height: size, backgroundColor: color }}
      >
        {getInitials(name)}
      </span>
      {status && (
        <span
          className={[
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white',
            status === 'online' ? 'bg-[#34c759]' : 'bg-[#ff3b30]',
          ].join(' ')}
        />
      )}
    </span>
  )
}

function ProfileMenuItem({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="flex h-10 w-full cursor-pointer items-center gap-3 px-4 text-left text-sm font-medium text-[#3a3a3a] transition-colors duration-200 hover:bg-[#f6f6f6] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black"
    >
      <Icon size={17} strokeWidth={1.8} className="shrink-0 text-[#6b6b6b]" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </button>
  )
}

function MainItem({ item, collapsed, activeId, openId, onToggle, onSelect }) {
  const Icon = item.icon
  const hasChildren = Array.isArray(item.children)
  const isOpen = openId === item.id
  const isActive =
    activeId === item.id ||
    (hasChildren && item.children.some((child) => child.id === activeId))
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const containerRef = useRef(null)

  // Close the collapsed flyout when clicking outside.
  useEffect(() => {
    if (!flyoutOpen) return undefined

    function handleClick(event) {
      if (!containerRef.current?.contains(event.target)) {
        setFlyoutOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [flyoutOpen])

  function handleClick() {
    if (hasChildren) {
      if (collapsed) {
        setFlyoutOpen((open) => !open)
      } else {
        onToggle(item.id)
      }
      return
    }
    onSelect(item.id)
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseLeave={() => collapsed && setFlyoutOpen(false)}
    >
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => collapsed && hasChildren && setFlyoutOpen(true)}
        aria-expanded={hasChildren ? (collapsed ? flyoutOpen : isOpen) : undefined}
        title={collapsed ? item.label : undefined}
        className={[
          'flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg text-[0.8125rem] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black',
          collapsed ? 'justify-center px-0' : 'px-3',
          isActive
            ? 'bg-[#f3f3f3] text-black'
            : 'text-[#6b6b6b] hover:bg-[#f6f6f6] hover:text-black',
        ].join(' ')}
      >
        <Icon size={17} strokeWidth={1.8} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1 truncate text-left">
              {item.label}
            </span>
            {hasChildren && (
              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className={[
                  'shrink-0 transition-transform duration-200',
                  isOpen ? 'rotate-180' : 'rotate-0',
                ].join(' ')}
              />
            )}
          </>
        )}
      </button>

      {/* Inline submenu (expanded sidebar) */}
      {!collapsed && hasChildren && isOpen && (
        <div className="relative mt-1 pl-7">
          <span className="absolute left-[1.45rem] top-0 h-full w-px bg-[#e6e6e6]" />
          <div className="flex flex-col">
            {item.children.map((child) => {
              const childActive = activeId === child.id
              return (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => onSelect(child.id)}
                  className={[
                    'relative flex h-9 items-center rounded-md pl-4 pr-3 text-left text-[0.8125rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black',
                    childActive
                      ? 'font-semibold text-black'
                      : 'font-medium text-[#8a8a8a] hover:text-black',
                  ].join(' ')}
                >
                  <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[#e6e6e6]" />
                  {child.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Flyout submenu (collapsed sidebar) */}
      {collapsed && hasChildren && flyoutOpen && (
        <div className="absolute left-full top-0 z-50 ml-3 w-44 rounded-xl border border-[#ececec] bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
          {item.children.map((child) => {
            const childActive = activeId === child.id
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => {
                  onSelect(child.id)
                  setFlyoutOpen(false)
                }}
                className={[
                  'flex h-9 w-full items-center rounded-md px-3 text-left text-[0.8125rem] transition-colors duration-200',
                  childActive
                    ? 'bg-[#f3f3f3] font-semibold text-black'
                    : 'font-medium text-[#6b6b6b] hover:bg-[#f6f6f6] hover:text-black',
                ].join(' ')}
              >
                {child.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Sidebar({ user, onLogout, defaultCollapsed = false }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [activeId, setActiveId] = useState('insights')
  const [openId, setOpenId] = useState('dashboard')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [profileMenuRender, setProfileMenuRender] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const profileRef = useRef(null)

  const displayName = user?.username ? user.username : 'John Doe'
  const role = user?.role ? user.role : 'Designer'
  const email = user?.email ? user.email : 'john.doe@allaboutneon.com'
  const initials = useMemo(() => getInitials(displayName), [displayName])

  function handleToggleSection(id) {
    setOpenId((current) => (current === id ? null : id))
  }

  // Close the profile menu when clicking outside of it.
  useEffect(() => {
    if (!profileMenuOpen) return undefined

    function handleClick(event) {
      if (!profileRef.current?.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [profileMenuOpen])

  // Keep the menu mounted while it plays its exit animation.
  useEffect(() => {
    if (profileMenuOpen || !profileMenuRender) return undefined

    const timeout = setTimeout(() => setProfileMenuRender(false), 180)
    return () => clearTimeout(timeout)
  }, [profileMenuOpen, profileMenuRender])

  function toggleProfileMenu() {
    setProfileMenuOpen((open) => {
      const next = !open
      if (next) setProfileMenuRender(true)
      return next
    })
  }

  return (
    <aside
      className={[
        'relative flex h-full flex-col rounded-[1.75rem] border border-[#ececec] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        collapsed ? 'w-[5.25rem]' : 'w-[17rem]',
      ].join(' ')}
    >
      {/* Collapse / expand toggle (absolute, anchored to the right edge) */}
      <button
        type="button"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => setCollapsed((value) => !value)}
        className="absolute right-0 top-5 z-50 grid h-7 w-7 -translate-y-0 translate-x-1/2 cursor-pointer place-items-center rounded-full border border-[#ececec] bg-white text-[#9a9a9a] shadow-sm transition-colors duration-200 hover:bg-[#f6f6f6] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        {collapsed ? (
          <ChevronRight size={15} strokeWidth={2} />
        ) : (
          <ChevronLeft size={15} strokeWidth={2} />
        )}
      </button>

      {/* Header */}
      <div className="flex h-20 items-center justify-center px-4">
        <img
          src={logo}
          alt="All About Neon"
          className={[
            'h-auto shrink-0 object-contain transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            collapsed ? 'w-12' : 'w-25',
          ].join(' ')}
        />
      </div>

      {/* Search */}
      <div className={collapsed ? 'px-3 pb-2' : 'px-5 pb-2'}>
        {collapsed ? (
          <button
            type="button"
            aria-label="Search"
            onClick={() => setCollapsed(false)}
            className="grid h-11 w-full place-items-center rounded-lg border border-[#ececec] text-[#9a9a9a] transition-colors duration-200 hover:bg-[#f6f6f6] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Search size={18} strokeWidth={1.8} />
          </button>
        ) : (
          <div className="relative">
            <Search
              size={16}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]"
            />
            <input
              type="search"
              placeholder="Search"
              className="h-11 w-full rounded-lg border border-[#ececec] bg-white pl-9 pr-16 text-sm outline-none transition-colors duration-200 focus:border-black focus:ring-2 focus:ring-black/5"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
              <kbd className="grid h-6 w-6 place-items-center rounded-md border border-[#ececec] bg-[#fafafa] text-xs font-medium text-[#9a9a9a]">
                ⌘
              </kbd>
              <kbd className="grid h-6 w-6 place-items-center rounded-md border border-[#ececec] bg-[#fafafa] text-xs font-medium text-[#9a9a9a]">
                S
              </kbd>
            </span>
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {/* MAIN */}
        <div className={collapsed ? 'px-3 pt-3' : 'px-5 pt-3'}>
          <p
            className={[
              'mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#b0b0b0]',
              collapsed ? 'text-center' : 'px-1',
            ].join(' ')}
          >
            Main
          </p>
          <nav className="flex flex-col gap-1" aria-label="Main navigation">
            {mainNav.map((item) => (
              <MainItem
                key={item.id}
                item={item}
                collapsed={collapsed}
                activeId={activeId}
                openId={openId}
                onToggle={handleToggleSection}
                onSelect={setActiveId}
              />
            ))}
          </nav>
        </div>

        {/* MESSAGES */}
        <div className={collapsed ? 'px-3 pt-6' : 'px-5 pt-6'}>
          <div
            className={[
              'mb-3 flex items-center',
              collapsed ? 'justify-center' : 'justify-between px-1',
            ].join(' ')}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#b0b0b0]">
              Messages
            </p>
            {!collapsed && (
              <button
                type="button"
                aria-label="New message"
                className="grid h-5 w-5 cursor-pointer place-items-center rounded-md text-[#9a9a9a] transition-colors duration-200 hover:bg-[#f6f6f6] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <Plus size={15} strokeWidth={2} />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            {messages.map((contact) => (
              <button
                key={contact.id}
                type="button"
                title={collapsed ? contact.name : undefined}
                className={[
                  'flex h-11 cursor-pointer items-center gap-3 rounded-lg text-[0.8125rem] font-medium text-[#4d4d4d] transition-colors duration-200 hover:bg-[#f6f6f6] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black',
                  collapsed ? 'justify-center px-0' : 'px-3',
                ].join(' ')}
              >
                <Avatar
                  name={contact.name}
                  color={contact.color}
                  status={contact.status}
                  size={collapsed ? 34 : 30}
                />
                {!collapsed && (
                  <span className="min-w-0 flex-1 truncate text-left">
                    {contact.name}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1" />
      </div>

      {/* Footer profile */}
      <div ref={profileRef} className={collapsed ? 'relative p-3' : 'relative p-4'}>
        {profileMenuRender && (
          <div
            className={[
              'absolute bottom-3 left-full z-50 -ml-3 w-64 origin-bottom-left overflow-hidden rounded-2xl border border-[#ececec] bg-white shadow-[0_16px_50px_rgba(0,0,0,0.14)] duration-200 ease-out',
              profileMenuOpen
                ? 'animate-in fade-in zoom-in-95 slide-in-from-left-2'
                : 'animate-out fade-out zoom-out-95 slide-out-to-left-2',
            ].join(' ')}
            role="menu"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="relative inline-flex shrink-0">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2f2f2f] text-sm font-semibold text-white">
                  {initials}
                </span>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#34c759]" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold text-black">
                  {displayName}
                </span>
                <span className="truncate text-xs text-[#8a8a8a]">{email}</span>
              </span>
            </div>

            <div className="h-px bg-[#efefef]" />

            <div className="py-1">
              <ProfileMenuItem icon={UserRound} label="View profile" />
              <ProfileMenuItem
                icon={Settings}
                label="Account settings"
                onClick={() => {
                  setProfileMenuOpen(false)
                  setSettingsOpen(true)
                }}
              />
              <ProfileMenuItem icon={Zap} label="Keyboard shortcuts" />
            </div>

            <div className="h-px bg-[#efefef]" />

            <div className="py-1">
              <ProfileMenuItem icon={Box} label="Updates" />
              <ProfileMenuItem
                icon={LogOut}
                label="Log out"
                onClick={() => {
                  setProfileMenuOpen(false)
                  onLogout?.()
                }}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => toggleProfileMenu()}
          aria-haspopup="menu"
          aria-expanded={profileMenuOpen}
          title={collapsed ? displayName : undefined}
          className={[
            'flex w-full cursor-pointer items-center rounded-xl border transition-colors duration-200 hover:bg-[#f6f6f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black',
            profileMenuOpen ? 'border-[#d8d8d8] bg-[#f6f6f6]' : 'border-[#ececec]',
            collapsed ? 'h-12 justify-center px-0' : 'h-14 justify-between px-3',
          ].join(' ')}
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#2f2f2f] text-xs font-semibold text-white">
              {initials}
            </span>
            {!collapsed && (
              <span className="flex min-w-0 flex-col text-left">
                <span className="truncate text-sm font-semibold text-black">
                  {displayName}
                </span>
                <span className="truncate text-[0.65rem] font-medium uppercase tracking-wide text-[#a3a3a3]">
                  {role}
                </span>
              </span>
            )}
          </span>
          {!collapsed && (
            <ChevronDown
              size={16}
              strokeWidth={1.8}
              className={[
                'shrink-0 text-[#9a9a9a] transition-transform duration-200',
                profileMenuOpen ? 'rotate-180' : 'rotate-0',
              ].join(' ')}
            />
          )}
        </button>
      </div>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </aside>
  )
}
