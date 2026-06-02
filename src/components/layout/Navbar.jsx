import { useEffect, useState } from 'react'
import createIcon from '../../assets/icons/create.svg'
import cartIcon from '../../assets/icons/cart.svg'
import checkIcon from '../../assets/icons/check.svg'
import homeIcon from '../../assets/icons/home.svg'
import happyIcon from '../../assets/icons/happy.svg'
import boxIcon from '../../assets/icons/box.svg'
import shopIcon from '../../assets/icons/shop.svg'
import signIcon from '../../assets/icons/sign.svg'
import signageIcon from '../../assets/icons/signage.svg'
import trendingIcon from '../../assets/icons/trending.svg'
import logoImage from '../../assets/image/logo.png'
import { Search } from '@/components/animate-ui/icons/search'
import { User } from '@/components/animate-ui/icons/user'
import {
  ChevronDown,
  ChevronRight,
  Folder,
  Home,
  Lightbulb,
  Menu,
  ShoppingBag,
  Sparkles,
  Store,
} from 'lucide-react'

const navIcons = [
  { src: homeIcon, label: 'Home' },
  { src: shopIcon, label: 'Shop' },
  { src: createIcon, label: 'Create Neon Sign' },
  { src: signIcon, label: 'Business Neon Sign' },
  { src: signageIcon, label: 'Business Signage' },
  { src: trendingIcon, label: 'Inspire Me' },
]

const mobileNavLinks = [
  { label: 'Home', icon: Home, color: 'text-[#f2994a]', href: '#' },
  {
    label: 'Shop',
    icon: ShoppingBag,
    color: 'text-[#34c759]',
    children: ['All Products', 'Custom Neon Signs', 'LED Signs'],
  },
  { label: 'Create Neon', icon: Sparkles, color: 'text-[#0a84ff]', href: '#' },
  {
    label: 'Business Neon',
    icon: Lightbulb,
    color: 'text-[#5856d6]',
    href: '#',
  },
  {
    label: 'Business Signage',
    icon: Store,
    color: 'text-[#ff3b30]',
    children: ['Outdoor Signs', 'Storefront Signs', 'Logo Signs'],
  },
  { label: 'Inspire Me', icon: Folder, color: 'text-[#5856d6]', href: '#' },
]

function IconNav() {
  return (
    <div className="flex w-full items-center justify-evenly">
      {navIcons.map((icon) => (
        <img
          key={icon.label}
          src={icon.src}
          alt={icon.label}
          className="h-5 w-5 sm:h-6 sm:w-6"
        />
      ))}
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

      <div className="min-w-0 flex-1 text-center">
        <img
          src={logoImage}
          alt="All About Neon"
          className="mx-auto h-25 w-auto object-contain"
        />
      </div>

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
  const [openSection, setOpenSection] = useState(null)

  if (!isOpen) {
    return null
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation menu"
        className="fixed inset-0 z-[90] bg-black/35 lg:hidden"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-[100] lg:hidden">
        <div className="mx-auto flex h-[24rem] w-full max-w-md flex-col rounded-t-[22px] bg-white px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-18px_50px_rgba(0,0,0,0.25)]">
          <div className="relative mb-5 flex h-7 items-center justify-center">
            <button
              type="button"
              className="absolute left-0 text-md font-medium text-black/35"
              onClick={onClose}
            >
              Cancel
            </button>
            <p className="text-md font-extrabold text-black">Menu</p>
          </div>

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pb-8 pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {mobileNavLinks.map(({ label, icon: LinkIcon, color, href, children }) => {
              const hasChildren = Boolean(children)
              const isExpanded = openSection === label
              const itemClass =
                'flex w-full items-center gap-4 text-left text-[.8rem] font-semibold text-black'

              return (
                <div key={label}>
                  {hasChildren ? (
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      className={itemClass}
                      onClick={() =>
                        setOpenSection((currentSection) =>
                          currentSection === label ? null : label,
                        )
                      }
                    >
                      <LinkIcon className={color} size={20} strokeWidth={1.9} />
                      <span className="flex-1">{label}</span>
                      <ChevronDown
                        className={[
                          'text-black/35 transition-transform',
                          isExpanded ? 'rotate-180' : '',
                        ].join(' ')}
                        size={16}
                        strokeWidth={2}
                      />
                    </button>
                  ) : (
                    <a href={href} onClick={onClose} className={itemClass}>
                      <LinkIcon className={color} size={20} strokeWidth={1.9} />
                      <span>{label}</span>
                    </a>
                  )}

                  {hasChildren && isExpanded && (
                    <div className="ml-9 mt-3 space-y-2">
                      {children.map((child) => {
                        const childLabel =
                          typeof child === 'string' ? child : child.label
                        const ChildIcon =
                          typeof child === 'string' ? ChevronRight : child.icon

                        return (
                          <button
                            key={childLabel}
                            type="button"
                            className="flex w-full items-center gap-3 rounded-xl bg-black/[0.04] px-3 py-2 text-left text-xs font-semibold text-black/65"
                            onClick={onClose}
                          >
                            <ChildIcon size={15} strokeWidth={2} />
                            <span>{childLabel}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mx-auto h-1.5 w-36 rounded-full bg-black" />
        </div>
      </div>
    </>
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
      <a href="#">Home</a>
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
            <div
              className={[
                'font-euclid h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11',
                scrolled
                  ? 'bg-gradient-to-br from-[#00ED64] via-[#00B3FF] to-[#7C4DFF] p-[2px]'
                  : 'border-4 border-[#00684A] bg-white text-[#001E2B]',
                scrolled ? 'flex' : 'flex lg:hidden',
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
                animateOnHover
                size={22}
                aria-label="Search"
                className="text-[#001E2B]"
              />
              <User
                animateOnHover
                size={22}
                aria-label="Profile"
                className="text-[#001E2B]"
              />
              <img src={cartIcon} alt="Cart" className="h-5 w-5" />
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
              <img src={checkIcon} alt="Check" className="h-4 w-4" />
              2 Years Warranty
            </span>
            <span className="h-1 w-1 rounded-full bg-[#001E2B]" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <img src={happyIcon} alt="Happy" className="h-4 w-4" />
              Happy Customer
            </span>
            <span className="h-1 w-1 rounded-full bg-[#001E2B]" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <img src={boxIcon} alt="Box" className="h-4 w-4" />
              Fast and Free Shipping
            </span>
          </div>
        </div>
      </nav>
      <MobileMenuSheet isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
