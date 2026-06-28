import { ChevronDown, ChevronUp } from 'lucide-react'

export default function OptionPicker({
  open,
  onToggle,
  options,
  value,
  onSelect,
  placeholder = 'Select',
  hasError = false,
}) {
  const selectedOption = options.find((option) => option === value)

  return (
    <div className="relative mt-2">
      <button
        type="button"
        onClick={onToggle}
        className={[
          'flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-left text-sm text-[#001E2B] transition hover:border-[#00684A]',
          hasError ? 'border-[#d84f68]' : 'border-[#c9d8d2]',
        ].join(' ')}
      >
        <span>{selectedOption || placeholder}</span>
        {open ? (
          <ChevronUp size={18} strokeWidth={1.8} className="text-[#6b7f77]" />
        ) : (
          <ChevronDown size={18} strokeWidth={1.8} className="text-[#6b7f77]" />
        )}
      </button>

      <div
        className={[
          'absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-[#c9d8d2] bg-white shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out origin-top',
          open
            ? 'pointer-events-auto translate-y-0 scale-y-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-y-95 opacity-0',
        ].join(' ')}
      >
        <div className="max-h-64 overflow-y-auto py-2">
          {options.map((option) => {
            const selected = option === value

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={[
                  'block w-full px-4 py-3 text-left text-sm transition',
                  selected
                    ? 'bg-[#eef8f3] font-medium text-[#00684A]'
                    : 'text-[#001E2B] hover:bg-[#f5fbf8]',
                ].join(' ')}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
