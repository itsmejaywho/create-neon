import { ChevronDown, ChevronUp } from 'lucide-react'

export default function TechnologyPicker({
  open,
  onToggle,
  options,
  value,
  onSelect,
}) {
  const selectedOption = options.find((option) => option.id === value)

  return (
    <div className="relative mt-2">
      <button
        type="button"
        onClick={onToggle}
        className="flex h-12 w-full items-center justify-between rounded-xl border border-[#c9d8d2] bg-white px-4 text-left text-sm text-[#001E2B] transition hover:border-[#00684A]"
      >
        <span>{selectedOption?.label || 'Select'}</span>
        {open ? (
          <ChevronUp size={18} strokeWidth={1.8} className="text-[#6b7f77]" />
        ) : (
          <ChevronDown size={18} strokeWidth={1.8} className="text-[#6b7f77]" />
        )}
      </button>

      <div
        className={[
          'absolute left-0 right-0 top-full z-20 mt-2 grid grid-cols-2 gap-3 rounded-2xl border border-[#c9d8d2] bg-white p-3 shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out origin-top sm:grid-cols-4',
          open
            ? 'pointer-events-auto translate-y-0 scale-y-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-y-95 opacity-0',
        ].join(' ')}
      >
        {options.map((option) => {
          const selected = option.id === value
          const Icon = option.Icon

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={[
                'overflow-hidden rounded-xl border text-left transition',
                selected
                  ? 'border-[#00684A] ring-2 ring-[#00ED64]/35'
                  : 'border-[#dfe8e3] hover:border-[#00684A]',
              ].join(' ')}
            >
              {option.image ? (
                <img
                  src={option.image}
                  alt={option.label}
                  className="h-28 w-full object-cover"
                />
              ) : (
                <div
                  className={[
                    'flex h-28 items-center justify-center bg-gradient-to-br',
                    option.accentClass,
                  ].join(' ')}
                >
                  <Icon
                    size={48}
                    strokeWidth={1.8}
                    className={option.id === 'not-sure' ? 'text-[#33424f]' : 'text-white'}
                  />
                </div>
              )}
              <div className="px-3 py-2 text-center text-sm font-medium text-[#001E2B]">
                {option.label}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
