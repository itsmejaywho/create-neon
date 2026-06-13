import { useEffect, useState } from 'react'
import logoImage from '../../assets/image/logo.png'
import LoginModal from '../../pages/LoginPage'
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  House,
  Menu,
  PackageCheck,
  PanelTop,
  PenTool,
  Search,
  ShoppingBag,
  ShoppingCart,
  Signpost,
  Smile,
  TrendingUp,
  User,
} from 'lucide-react'

const navIcons = [
  { Icon: House, label: 'Home', href: '/' },
  { Icon: ShoppingBag, label: 'Shop' },
  { Icon: PenTool, label: 'Create Neon Sign' },
  { Icon: Signpost, label: 'Business Neon Sign' },
  { Icon: PanelTop, label: 'Business Signage' },
  { Icon: TrendingUp, label: 'Inspire Me' },
]

const mobileMenuLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Shop',
    children: ['All Products', 'Custom Neon Signs', 'LED Signs'],
  },
  { label: 'Create Neon', href: '#' },
  { label: 'Business Neon', href: '#' },
  {
    label: 'Business Signage',
    children: ['Outdoor Signs', 'Storefront Signs', 'Logo Signs'],
  },
  { label: 'Inspire Me', href: '#' },
]

function IconNav() {
  return (
    <div className="flex w-full items-center justify-evenly">
      {navIcons.map(({ Icon, label, href }) => {
        const icon = (
          <Icon
            aria-label={label}
            role="img"
            className="h-5 w-5 stroke-[1.8] text-[#001E2B] sm:h-6 sm:w-6"
          />
        )

        if (href) {
          return (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00684A]"
            >
              {icon}
            </a>
          )
        }

        return <span key={label}>{icon}</span>
      })}
    </div>
  )
}

function MobileTextNav({ menuOpen, onToggleMenu }) {
  return (
    <div className="flex h-full w-full items-center gap-3 px-4 pt-4">
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/85 text-[#001E2B] shadow-[0_4px_12px_rgba(0,0,0,0.18)] ring-1 ring-black/10 backdrop-blur-sm"
      >
        <Menu size={19} strokeWidth={1.8} />
      </button>

      <a
        href="/"
        aria-label="Go to home page"
        className="min-w-0 flex-1 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00684A]"
      >
        <img
          src={logoImage}
          alt="All About Neon"
          className="mx-auto h-25 w-auto object-contain"
        />
      </a>

      <button
        type="button"
        aria-label="Next navigation item"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#001E2B]"
      >
        <ChevronRight size={24} strokeWidth={2.1} />
      </button>
    </div>
  )
}

function MobileMenuSheet({ isOpen, onClose }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[120] lg:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        className="absolute inset-0 bg-black/10"
        onClick={onClose}
      />
      <aside className="relative h-full w-[min(76vw,18rem)] bg-[#fafafa] px-10 pt-9 shadow-[10px_0_24px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          className="mb-7 flex items-center gap-1 text-[0.62rem] font-medium uppercase tracking-wide text-black/65"
          onClick={onClose}
        >
          <ChevronLeft size={12} strokeWidth={1.7} />
          Menu
        </button>

        <nav aria-label="Mobile navigation">
          <ul className="space-y-5">
            {mobileMenuLinks.map(({ label, href = '#', children }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={onClose}
                  className="block text-[0.62rem] font-semibold uppercase tracking-wide text-black transition hover:text-black/55"
                >
                  {label}
                </a>

                {children && (
                  <ul className="mt-4 space-y-3">
                    {children.map((child) => (
                      <li key={child}>
                        <a
                          href="#"
                          onClick={onClose}
                          className="block pl-4 text-[0.58rem] font-medium uppercase tracking-wide text-black/55 transition hover:text-black"
                        >
                          {child}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  )
}

function MobileNav({ menuOpen, onToggleMenu }) {
  return (
    <div className="h-full w-full bg-white/85 shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <MobileTextNav menuOpen={menuOpen} onToggleMenu={onToggleMenu} />
    </div>
  )
}

function TextNav() {
  return (
    <div className="font-euclid hidden w-full items-center justify-evenly gap-3 text-xs font-medium uppercase text-[#001E2B] lg:flex xl:gap-4 xl:text-sm">
      <a href="/">Home</a>
      <a href="#" className="flex items-center gap-1">
        Shop
        <span aria-hidden="true">v</span>
      </a>
      <a
        href="#"
        className="whitespace-nowrap rounded-full bg-[#00ED64] px-4 py-2 text-[#001E2B] xl:px-5"
      >
        Create Neon Sign
      </a>
      <a href="#" className="whitespace-nowrap">
        Business Neon Sign
      </a>
      <a href="#" className="flex items-center gap-1 whitespace-nowrap">
        Business Signage
        <span aria-hidden="true">v</span>
      </a>
      <a href="#" className="whitespace-nowrap">
        Inspire Me
      </a>
    </div>
  )
}

export default function Navbar({ onLogin }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-[100] h-18 w-full transition-all duration-300 ease-out md:h-20 lg:h-30',
        scrolled ? 'lg:top-5' : 'lg:top-0',
      ].join(' ')}
    >
      <nav
        className={[
          'relative mx-auto flex overflow-visible transition-all duration-600 ease-out lg:overflow-hidden',
          scrolled ? 'flex-row' : 'flex-col',
          scrolled
            ? 'h-full w-full rounded-none border-b border-black/10 bg-white shadow-none backdrop-blur-0 lg:h-14 lg:w-[min(calc(100%-2rem),50rem)] lg:rounded-full lg:border lg:border-black/15 lg:bg-white/20 lg:bg-gradient-to-b lg:from-white/35 lg:via-white/20 lg:to-white/10 lg:shadow-[0_10px_28px_rgba(0,0,0,0.18)] lg:backdrop-blur-lg lg:backdrop-saturate-150'
            : 'h-full w-full border border-transparent bg-white px-0 shadow-none backdrop-blur-0 lg:bg-transparent lg:px-6',
        ].join(' ')}
      >
        <div className="flex h-full w-full lg:hidden">
          <MobileNav
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((isOpen) => !isOpen)}
          />
        </div>
        <div
          className={[
            'hidden w-full transition-all duration-300 ease-out lg:flex',
            scrolled ? 'h-full' : 'h-full lg:h-[60%]',
          ].join(' ')}
        >
          <div className="flex h-full basis-[18%] items-center justify-start gap-2 pl-3 sm:basis-1/5 sm:pl-4 lg:justify-center lg:pl-0">
            <a
              href="/"
              aria-label="Go to home page"
              className={[
                'inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00684A]',
                scrolled ? '' : 'lg:block',
              ].join(' ')}
            >
              <div
                className={[
                  'font-euclid h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11',
                  scrolled
                    ? 'flex bg-gradient-to-br from-[#00ED64] via-[#00B3FF] to-[#7C4DFF] p-[2px]'
                    : 'hidden border-4 border-[#00684A] bg-white text-[#001E2B] lg:hidden',
                ].join(' ')}
              >
                <div
                  className={[
                    'flex h-full w-full items-center justify-center rounded-full',
                    scrolled ? 'bg-[#0b0f14] text-white' : 'bg-transparent',
                  ].join(' ')}
                >
                  <p className="text-base font-black sm:text-[15px]">AAN</p>
                </div>
              </div>
              <img
                src={logoImage}
                alt="All About Neon"
                className={[
                  'h-35 w-auto object-contain',
                  scrolled ? 'hidden' : 'hidden lg:block',
                ].join(' ')}
              />
            </a>
          </div>
          {scrolled && (
            <div
              className="h-1/2 w-px self-center bg-black/15"
              aria-hidden="true"
            />
          )}
          <div className="flex h-full min-w-0 flex-1 items-center justify-between lg:basis-3/5">
            {scrolled ? (
              <div className="hidden w-full lg:flex">
                <IconNav />
              </div>
            ) : (
              <>
                <TextNav />
              </>
            )}
          </div>
          {scrolled && (
            <div
              className="h-1/2 w-px self-center bg-black/15"
              aria-hidden="true"
            />
          )}
          <div
            className={[
              'flex h-full basis-[18%] items-center justify-end gap-3 sm:basis-1/5',
              scrolled ? 'lg:justify-evenly' : 'lg:justify-between',
            ].join(' ')}
          >
            <div className="hidden w-full items-center justify-center gap-7 lg:flex">
              <Search
                size={22}
                strokeWidth={1.8}
                aria-label="Search"
                role="img"
                className="text-[#001E2B]"
              />
              <button
                type="button"
                aria-label="Open login modal"
                onClick={() => setLoginOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-full text-[#001E2B] transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001E2B]"
              >
                <User size={22} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <ShoppingCart
                aria-label="Cart"
                role="img"
                className="h-5 w-5 stroke-[1.8] text-[#001E2B]"
              />
            </div>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border-2 border-[#001E2B] bg-white lg:hidden"
            >
              <span className="h-0.5 w-5 rounded-full bg-[#001E2B]" />
              <span className="h-0.5 w-5 rounded-full bg-[#001E2B]" />
              <span className="h-0.5 w-5 rounded-full bg-[#001E2B]" />
            </button>
          </div>
        </div>
        <div
          className={[
            'w-full transition-all duration-300 ease-out lg:border-t lg:border-[#001E2B]/25',
            scrolled ? 'hidden' : 'hidden lg:flex lg:h-[40%] lg:items-center lg:justify-center',
          ].join(' ')}
        >
          <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wide text-[#001E2B]">
            <span className="flex items-center gap-2">
              <BadgeCheck aria-hidden="true" className="h-4 w-4 stroke-[1.8]" />
              2 Years Warranty
            </span>
            <span className="h-1 w-1 rounded-full bg-[#001E2B]" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <Smile aria-hidden="true" className="h-4 w-4 stroke-[1.8]" />
              Happy Customer
            </span>
            <span className="h-1 w-1 rounded-full bg-[#001E2B]" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <PackageCheck aria-hidden="true" className="h-4 w-4 stroke-[1.8]" />
              Fast and Free Shipping
            </span>
          </div>
        </div>
      </nav>
      <MobileMenuSheet isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={onLogin}
      />
    </header>
  )
}
