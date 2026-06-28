import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

export default function CountryCodePicker({
  open,
  onToggle,
  options,
  value,
  onSelect,
  hasError = false,
}) {
  const [searchValue, setSearchValue] = useState('')
  const searchInputRef = useRef(null)
  const selectedOption = options.find((option) => option.value === value)
  const filteredOptions = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    if (!normalizedSearch) {
      return options
    }

    return options.filter((option) => {
      const label = option.label.toLowerCase()
      const dialCode = option.dialCode.toLowerCase()
      const code = option.value.toLowerCase()

      return (
        label.includes(normalizedSearch) ||
        dialCode.includes(normalizedSearch) ||
        code.includes(normalizedSearch)
      )
    })
  }, [options, searchValue])

  useEffect(() => {
    if (open) {
      searchInputRef.current?.focus()
      return
    }

    setSearchValue('')
  }, [open])

  return (
    <div className="relative mt-2">
      <button
        type="button"
        onClick={onToggle}
        className={[
          'flex h-12 w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 text-left text-sm text-[#001E2B] transition hover:border-[#00684A]',
          hasError ? 'border-[#d84f68]' : 'border-[#c9d8d2]',
        ].join(' ')}
      >
        <div className="min-w-0">
          <div className="truncate font-medium">
            {selectedOption?.label || 'Select country'}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm font-medium text-[#001E2B]">
            {selectedOption?.dialCode || ''}
          </span>
          {open ? (
            <ChevronUp size={18} strokeWidth={1.8} className="text-[#6b7f77]" />
          ) : (
            <ChevronDown
              size={18}
              strokeWidth={1.8}
              className="text-[#6b7f77]"
            />
          )}
        </div>
      </button>

      <div
        className={[
          'absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-[#c9d8d2] bg-white shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out origin-top',
          open
            ? 'pointer-events-auto translate-y-0 scale-y-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-y-95 opacity-0',
        ].join(' ')}
      >
        <div className="border-b border-[#e3eee9] px-3 py-3">
          <div className="flex h-10 items-center gap-2 rounded-xl border border-[#d3e1db] bg-[#fbfefd] px-3 focus-within:border-[#00684A] focus-within:ring-4 focus-within:ring-[#00ED64]/15">
            <Search size={16} strokeWidth={1.8} className="text-[#6b7f77]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search country or code"
              className="w-full bg-transparent text-sm text-[#001E2B] outline-none placeholder:text-[#8aa197]"
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto py-2">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[#6b7f77]">
              No country found.
            </div>
          ) : null}

          {filteredOptions.map((option) => {
            const selected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value)
                  setSearchValue('')
                }}
                className={[
                  'flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition',
                  selected
                    ? 'bg-[#eef8f3] font-medium text-[#00684A]'
                    : 'text-[#001E2B] hover:bg-[#f5fbf8]',
                ].join(' ')}
              >
                <span className="truncate">{option.label}</span>
                <span className="shrink-0">{option.dialCode}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
