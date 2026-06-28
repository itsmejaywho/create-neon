import { useEffect } from 'react'
import { X } from 'lucide-react'
import customLogoImage from '../../assets/image/best6.png'
import textNeonImage from '../../assets/image/best5.jpg'

const options = [
  {
    id: 'text',
    image: textNeonImage,
    title: 'Custom Text Neon',
    description: 'Design your custom text neon sign directly on our app.',
    cta: 'Design your text neon',
    href: '#design-text-neon',
  },
  {
    id: 'logo',
    image: customLogoImage,
    title: 'Custom Logo & Design',
    description:
      'Create impactful branded spaces with custom signage tailored to your business.',
    cta: 'Get a free quote',
    href: '#get-a-quote',
  },
]

export default function CreateNeonModal({ open, onClose, onSelect }) {
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
      onMouseDown={onClose}
      className={[
        'fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px] transition-opacity duration-300 ease-out',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Choose your neon type"
        onMouseDown={(event) => event.stopPropagation()}
        className={[
          'relative w-full max-w-5xl rounded-3xl bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-6',
          open
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-2 scale-95 opacity-0',
        ].join(' ')}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Create your neon
            </h2>
            <p className="mt-1 text-sm text-[#6b6b6b]">
              Pick how you want to get started.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg text-[#8a8a8a] transition-colors duration-200 hover:bg-[#f4f4f4] hover:text-black"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect?.(option.id)}
              className="group relative h-[460px] cursor-pointer overflow-hidden rounded-2xl text-left sm:h-[560px]"
            >
              <img
                src={option.image}
                alt={option.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <h3 className="text-lg font-bold uppercase tracking-wide sm:text-xl">
                  {option.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/85">
                  {option.description}
                </p>
                <span className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4b2cff] to-[#ff2aa1] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-transform duration-200 group-hover:-translate-y-0.5">
                  {option.cta}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
