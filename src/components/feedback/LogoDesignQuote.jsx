import { useEffect } from 'react'
import LogoQuoteForm from './logoQuote/LogoQuoteForm'
import LogoQuoteShowcase from './logoQuote/LogoQuoteShowcase'
import OverlayCloseButton from '../ui/OverlayCloseButton'

export default function LogoDesignQuote({
  open,
  onClose,
  onOpenTextDesigner,
}) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(event) {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  return (
    <div
      aria-hidden={!open}
      className={[
        'fixed inset-0 z-[140] flex flex-col overflow-y-auto bg-[#001E2B] transition-opacity duration-300 ease-out lg:flex-row lg:overflow-hidden',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
    >
      <OverlayCloseButton
        ariaLabel="Close quote form"
        onClick={onClose}
        className="absolute left-4 top-4 z-10"
      />

      <div className="flex min-h-screen w-full flex-col lg:h-screen lg:flex-row">
        <div className="lg:flex-1">
          <LogoQuoteShowcase />
        </div>
        <div className="w-full bg-white lg:w-[48%] lg:max-w-[760px]">
          <LogoQuoteForm
            onOpenTextDesigner={onOpenTextDesigner}
          />
        </div>
      </div>
    </div>
  )
}
