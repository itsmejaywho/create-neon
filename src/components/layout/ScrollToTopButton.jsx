import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 360)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={[
        'fixed bottom-4 right-4 z-[90] grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-[#00684A] text-white shadow-[0_10px_22px_rgba(0,0,0,0.16)] transition-all duration-300 ease-out hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#00ED64] sm:bottom-6 sm:right-6 sm:h-10 sm:w-10',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      ].join(' ')}
    >
      <ArrowUp aria-hidden="true" className="h-4 w-4 stroke-[2.2]" />
    </button>
  )
}
