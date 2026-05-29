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

const navIcons = [
  { src: homeIcon, label: 'Home' },
  { src: shopIcon, label: 'Shop' },
  { src: createIcon, label: 'Create Neon Sign' },
  { src: signIcon, label: 'Business Neon Sign' },
  { src: signageIcon, label: 'Business Signage' },
  { src: trendingIcon, label: 'Inspire Me' },
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
        'sticky z-50 h-20 w-full transition-all duration-300 ease-out md:h-24 lg:h-30',
        scrolled ? 'top-3 md:top-5' : 'top-0',
      ].join(' ')}
    >
      <nav
        className={[
          'mx-auto flex overflow-hidden transition-all duration-600 ease-out',
          scrolled ? 'flex-row' : 'flex-col',
          scrolled
            ? 'h-12 w-[min(calc(100%-1rem),60rem)] rounded-full border border-black/15 bg-white/20 bg-gradient-to-b from-white/35 via-white/20 to-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-lg backdrop-saturate-150 sm:h-14 sm:w-[min(calc(100%-2rem),50rem)]'
            : 'h-full w-full border border-transparent bg-transparent px-3 shadow-none backdrop-blur-0 sm:px-4 lg:px-6',
        ].join(' ')}
      >
        <div
          className={[
            'flex w-full transition-all duration-300 ease-out',
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
    </header>
  )
}
