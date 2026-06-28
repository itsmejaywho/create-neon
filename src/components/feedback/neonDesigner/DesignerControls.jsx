import { ChevronDown } from 'lucide-react'
import {
  MAX_H,
  MAX_W,
  MIN_H,
  MIN_W,
  clamp,
} from './utils'

export default function DesignerControls({
  activeFont,
  activePresetId,
  align,
  alignments,
  applyPreset,
  colorId,
  colors,
  font,
  fontMenuOpen,
  fonts,
  handleSlider,
  height,
  locationId,
  locations,
  manualSize,
  setAlign,
  setColorId,
  setFont,
  setFontMenuOpen,
  setHeight,
  setLocationId,
  setManualSize,
  setText,
  setWidth,
  sizePresets,
  text,
  width,
}) {
  return (
    <aside className="flex min-h-[50vh] w-full flex-1 flex-col overflow-y-auto bg-white text-black lg:h-full lg:min-h-0 lg:w-[400px] lg:flex-none">
      <div className="space-y-6 p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">
          Looking for a logo?{' '}
          <button
            type="button"
            className="cursor-pointer font-bold text-[#00684A] underline-offset-2 hover:underline"
          >
            Get a quote
          </button>
        </p>

        <h2 className="text-2xl font-bold text-[#00684A]">
          Create your own neon
        </h2>

        <section>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold">1. Choose your text</h3>
            <div className="flex gap-1 rounded-lg bg-[#f4f4f4] p-1">
              {alignments.map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-label={`Align ${id}`}
                  onClick={() => setAlign(id)}
                  className={[
                    'grid h-8 w-8 cursor-pointer place-items-center rounded-md transition-colors duration-200',
                    align === id
                      ? 'bg-[#00684A] text-white'
                      : 'text-[#6b6b6b] hover:bg-[#eaeaea]',
                  ].join(' ')}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </button>
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-[#8a8a8a]">
            Click below to edit the text on your neon sign.
          </p>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={3}
            className="mt-3 w-full resize-none rounded-lg border border-[#e2e2e2] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#00684A] focus:ring-2 focus:ring-[#00684A]/15"
          />
          <p className="mt-2 text-xs text-[#a3a3a3]">
            Hit Return to go into the next line.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#3a3a3a]">
            Font Selection
          </h3>
          <div className="relative">
            <button
              type="button"
              onClick={() => setFontMenuOpen((value) => !value)}
              aria-expanded={fontMenuOpen}
              className="flex h-11 w-full cursor-pointer items-center justify-between rounded-lg bg-[#00684A] px-4 text-sm font-semibold text-[#E9FFF4] shadow-[0_10px_24px_rgba(0,104,74,0.2)]"
            >
              <span
                style={{
                  fontFamily: activeFont.family,
                  fontWeight: activeFont.previewWeight,
                }}
              >
                {activeFont.label}
              </span>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={[
                  'transition-transform duration-200',
                  fontMenuOpen ? 'rotate-180' : 'rotate-0',
                ].join(' ')}
              />
            </button>
            {fontMenuOpen && (
              <div className="absolute left-0 right-0 top-full z-10 mt-4 rounded-2xl border border-[#d7ebe4] bg-[#f7fcfa] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3">
                  {fonts.map((option) => {
                    const selected = option.id === font
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setFont(option.id)
                          setFontMenuOpen(false)
                        }}
                        className="cursor-pointer text-left"
                      >
                        <div
                          className={[
                            'relative',
                            option.overall ? 'pt-4' : '',
                          ].join(' ')}
                        >
                          {option.overall && (
                            <span className="absolute left-2 top-0 z-10 rounded bg-[#00A86B] px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide text-white">
                              Overall pick
                            </span>
                          )}
                          <div
                            className={[
                              'flex h-[84px] items-center justify-center rounded-lg border-2 px-3 transition-colors',
                              selected
                                ? 'border-[#00A86B] bg-[#00684A] text-[#F4FFF9] shadow-[0_12px_28px_rgba(0,104,74,0.18)]'
                                : 'border-[#9DB8AE] bg-white text-black hover:border-[#00A86B] hover:bg-[#F2FBF7]',
                            ].join(' ')}
                          >
                            <span
                              style={{
                                fontFamily: option.previewFamily,
                                fontWeight: option.previewWeight,
                              }}
                              className="text-[2rem] leading-none"
                            >
                              Hello
                            </span>
                          </div>
                        </div>
                        <span
                          className={[
                            'mt-1 block text-[0.95rem]',
                            selected ? 'text-[#00684A]' : 'text-[#3a3a3a]',
                          ].join(' ')}
                        >
                          {option.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-base font-bold">2. Choose your color</h3>
          <p className="mt-1 text-sm text-[#8a8a8a]">
            Which color do you want your neon light to be?
          </p>
          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
            {colors.map((color) => {
              const selected = color.id === colorId
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setColorId(color.id)}
                  className="flex cursor-pointer flex-col items-center gap-1.5"
                >
                  <span
                    className={[
                      'relative grid h-12 w-12 place-items-center rounded-lg transition-transform duration-200 hover:scale-105',
                      selected ? 'ring-2 ring-[#00684A] ring-offset-2' : '',
                    ].join(' ')}
                    style={
                      color.rgb
                        ? {
                            background:
                              'conic-gradient(#ff2d2d,#ffcf33,#3ddc6d,#5bc8ff,#9b5cff,#ff2aa1,#ff2d2d)',
                          }
                        : { backgroundColor: color.value }
                    }
                  >
                    {color.overall && (
                      <span className="absolute -top-2 rounded bg-[#00684A] px-1 py-0.5 text-[0.5rem] font-bold uppercase text-white">
                        Overall pick
                      </span>
                    )}
                  </span>
                  <span className="text-center text-[0.65rem] font-medium leading-tight text-[#4d4d4d]">
                    {color.name}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section>
          <h3 className="text-base font-bold">3. Size</h3>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {sizePresets.map((preset) => {
              const selected = activePresetId === preset.id
              return (
                <div key={preset.id} className="relative">
                  {preset.overall && (
                    <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-[#00684A] px-1.5 py-0.5 text-[0.5rem] font-bold uppercase tracking-wide text-white">
                      Overall pick
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={[
                      'flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 transition-colors duration-200',
                      selected
                        ? 'border-[#00684A] bg-[#00684A] text-white'
                        : 'border-[#cce8dd] bg-white text-[#00684A] hover:border-[#00684A]',
                    ].join(' ')}
                  >
                    <span className="text-sm font-bold">{preset.label}</span>
                    <span
                      className={[
                        'text-xs',
                        selected ? 'text-[#00ED64]' : 'text-[#00684A]',
                      ].join(' ')}
                    >
                      {preset.w} x {preset.h}cm
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          <div className="mt-4 rounded-xl border border-[#e2e2e2] p-4">
            <h4 className="text-sm font-bold text-[#00684A]">Custom Size</h4>

            <input
              type="range"
              min={MIN_W}
              max={MAX_W}
              value={width}
              onChange={handleSlider}
              aria-label="Custom width"
              className="mt-3 w-full cursor-pointer accent-[#00684A]"
            />

            <div className="mt-2 flex items-center justify-between">
              <span className="text-base font-bold text-[#00684A]">
                {width} x {height}cm
              </span>
              <button
                type="button"
                onClick={() => setManualSize((value) => !value)}
                className="cursor-pointer text-sm text-[#6b6b6b] underline underline-offset-2 hover:text-black"
              >
                {manualSize ? 'Hide manual entry' : 'Enter sizes manually'}
              </button>
            </div>

            {manualSize && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-xs font-semibold text-[#3a3a3a]">
                  Width (cm)
                  <input
                    type="number"
                    min={MIN_W}
                    max={MAX_W}
                    value={width}
                    onChange={(event) =>
                      setWidth(
                        clamp(Number(event.target.value) || 0, MIN_W, MAX_W),
                      )
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#00684A]"
                  />
                </label>
                <label className="text-xs font-semibold text-[#3a3a3a]">
                  Height (cm)
                  <input
                    type="number"
                    min={MIN_H}
                    max={MAX_H}
                    value={height}
                    onChange={(event) =>
                      setHeight(
                        clamp(Number(event.target.value) || 0, MIN_H, MAX_H),
                      )
                    }
                    className="mt-1 h-10 w-full rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#00684A]"
                  />
                </label>
                <p className="col-span-2 text-xs text-[#a3a3a3]">
                  Maximum size is {MAX_W} x {MAX_H}cm.
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-base font-bold">4. Location</h3>
          <p className="mt-1 text-sm text-[#8a8a8a]">
            Where do you intend placing your neon?
          </p>

          <div className="mt-4 flex flex-wrap items-start gap-6">
            {locations.map((location) => {
              const selected = location.id === locationId

              return (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => setLocationId(location.id)}
                  className="flex cursor-pointer flex-col items-center text-center"
                >
                  <span
                    className={[
                      'grid h-14 w-14 place-items-center rounded-full border-2 bg-white p-0.5 transition-colors',
                      selected
                        ? 'border-[#00684A] ring-2 ring-[#00684A]/15'
                        : 'border-transparent hover:border-[#cce8dd]',
                    ].join(' ')}
                  >
                    <span
                      className="h-full w-full rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${location.image})` }}
                    />
                  </span>
                  <span className="mt-3 text-sm font-bold uppercase tracking-wide text-[#00684A]">
                    {location.label}
                  </span>
                  {location.surcharge && (
                    <span className="mt-2 rounded bg-[#00A86B] px-2 py-1 text-xs font-bold text-white">
                      ${location.surcharge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </aside>
  )
}
