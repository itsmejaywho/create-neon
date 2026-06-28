import { Eye, Share2, X } from 'lucide-react'

export default function DesignerCanvas({
  activeColor,
  activeFont,
  displayColor,
  displayShadow,
  height,
  isMobileView,
  isSaving,
  lines,
  onClose,
  onFinishDesign,
  onOpenPreview,
  previewFontSize,
  saveMessage,
  textAlignClass,
  width,
}) {
  return (
    <div className="relative flex min-h-[22rem] shrink-0 flex-col lg:h-full lg:min-h-0 lg:flex-1">
      <button
        type="button"
        aria-label="Close designer"
        onClick={onClose}
        className="absolute left-4 top-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
      >
        <X size={18} strokeWidth={1.8} />
      </button>

      <div className="flex flex-1 items-center justify-center px-4 pb-4 pt-16 sm:p-6">
        <div
          className={[
            'flex w-full flex-col',
            isMobileView ? 'max-w-[22rem]' : 'max-w-3xl',
            textAlignClass,
          ].join(' ')}
        >
          <div className="flex items-stretch gap-2 sm:gap-4">
            <span
              className={[
                'flex items-center text-[0.6rem] tracking-widest text-white/40',
                isMobileView ? 'min-w-[2.75rem]' : 'min-w-[2.5rem] sm:min-w-0',
              ].join(' ')}
            >
              {height}cm
            </span>
            <div
              className={[
                'neon-text flex flex-col justify-center gap-1 px-4 py-3 sm:px-6 sm:py-4',
                isMobileView ? 'min-h-[8.5rem] w-full' : '',
                activeColor.rgb ? 'neon-rgb' : '',
              ].join(' ')}
              style={{
                color: displayColor,
                textShadow: displayShadow,
              }}
            >
              {lines.map((line, index) => (
                <span
                  key={index}
                  className="leading-tight transition-[font-size] duration-300 ease-out"
                  style={{
                    fontFamily: activeFont.family,
                    fontSize: `${previewFontSize}px`,
                    fontWeight: activeFont.previewWeight,
                  }}
                >
                  {line || '\u00A0'}
                </span>
              ))}
            </div>
          </div>

          <div
            className={[
              'mt-4 flex w-full flex-col items-center',
              isMobileView ? 'max-w-[18rem] self-center' : 'max-w-md',
            ].join(' ')}
          >
            <div className="h-2 w-full border-x border-t border-white/20" />
            <span className="mt-1 text-[0.6rem] tracking-widest text-white/40">
              {width}cm
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 bg-[#01161f] px-4 py-3 sm:px-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
        {isMobileView ? (
          <div className="flex items-center justify-between gap-3 text-white/80">
            <button
              type="button"
              onClick={onOpenPreview}
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold transition-colors hover:text-white"
            >
              <Eye size={14} strokeWidth={1.8} />
              Preview My Sign
            </button>
            <button
              type="button"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-medium transition-colors hover:text-white"
            >
              <Share2 size={16} strokeWidth={1.8} />
              Share design
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <Share2 size={16} strokeWidth={1.8} />
              Share design
            </button>
            <button
              type="button"
              onClick={onOpenPreview}
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#2f313d] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#252733]"
            >
              <Eye size={14} strokeWidth={1.8} />
              Preview My Sign
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-lg font-bold text-[#00ED64]">PHP 9,581</span>
          <span className="text-sm text-white/40 line-through">PHP 12,007</span>
          <span className="rounded bg-[#00684A] px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wide">
            20% off
          </span>
          <button
            type="button"
            onClick={onFinishDesign}
            disabled={isSaving}
            className="ml-auto min-h-12 rounded-full bg-gradient-to-r from-[#00ED64] to-[#00b3ff] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#0b0f14] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:ml-0"
          >
            {isSaving ? 'Saving design...' : 'Finish my design'}
          </button>
        </div>
      </div>
      {saveMessage && (
        <p className="border-t border-white/10 bg-[#01161f] px-5 py-3 text-sm text-white/80">
          {saveMessage}
        </p>
      )}
    </div>
  )
}
