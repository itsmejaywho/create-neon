import { Lightbulb, X } from 'lucide-react'
import previewBackgroundImage from '../../../assets/image/previews.png'

export default function DesignerPreviewModal({
  activeColor,
  activeFont,
  displayColor,
  draggingPreview,
  handlePreviewDragStart,
  lines,
  lightsOn,
  onClose,
  onToggleLights,
  previewDisplayShadow,
  previewOpen,
  previewPosition,
  previewSceneRef,
  previewTextRef,
  stagedPreviewFontSize,
  textAlignClass,
}) {
  if (!previewOpen) {
    return null
  }

  return (
    <div
      className="absolute inset-0 z-[150] flex items-center justify-center bg-black/45 p-4"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-[#101216] shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close preview"
          onClick={onClose}
          className="absolute left-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/35 text-white transition-colors hover:bg-black/50"
        >
          <X size={18} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          aria-label="Lighting options"
          onClick={onToggleLights}
          className={[
            'absolute right-4 top-4 z-10 grid h-12 w-12 cursor-pointer place-items-center rounded-full transition-colors duration-200',
            lightsOn
              ? 'bg-white text-[#6f6f75] hover:bg-white/90'
              : 'bg-white text-[#6f6f75] hover:bg-[#f1f1f1]',
          ].join(' ')}
        >
          <Lightbulb size={18} strokeWidth={1.8} />
        </button>

        <div
          ref={previewSceneRef}
          className="relative aspect-[16/10] w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${previewBackgroundImage})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.18),rgba(10,10,12,0.32))]" />

          <div className="relative z-[1] h-full w-full px-8 sm:px-12">
            <div
              ref={previewTextRef}
              onPointerDown={handlePreviewDragStart}
              className={[
                'absolute left-1/2 top-[18%] inline-flex -translate-x-1/2 select-none flex-col items-center gap-1 px-3 py-2 touch-none',
                activeColor.rgb ? 'neon-rgb' : '',
                textAlignClass,
                draggingPreview ? 'cursor-grabbing' : 'cursor-grab',
              ].join(' ')}
              style={{
                color: displayColor,
                textShadow: previewDisplayShadow,
                transform: `translate(calc(-50% + ${previewPosition.x}px), ${previewPosition.y}px)`,
              }}
            >
              {lines.map((line, index) => (
                <span
                  key={`preview-${index}`}
                  className="leading-tight transition-[font-size] duration-300 ease-out"
                  style={{
                    fontFamily: activeFont.family,
                    fontSize: `${stagedPreviewFontSize}px`,
                    fontWeight: activeFont.previewWeight,
                  }}
                >
                  {line || '\u00A0'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
