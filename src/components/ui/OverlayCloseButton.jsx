import { X } from 'lucide-react'

export default function OverlayCloseButton({
  ariaLabel = 'Close',
  className = '',
  onClick,
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={[
        'grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20',
        className,
      ].join(' ')}
    >
      <X size={18} strokeWidth={1.8} />
    </button>
  )
}
