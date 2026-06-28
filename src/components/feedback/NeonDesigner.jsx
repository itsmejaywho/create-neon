import { useEffect, useMemo, useRef, useState } from 'react'
import { saveDesignOrder } from '../../lib/designApi'
import DesignerCanvas from './neonDesigner/DesignerCanvas'
import DesignerControls from './neonDesigner/DesignerControls'
import DesignerPreviewModal from './neonDesigner/DesignerPreviewModal'
import {
  QUOTED_PRICE,
  alignments,
  colors,
  fonts,
  locations,
  sizePresets,
} from './neonDesigner/data'
import {
  MIN_W,
  clamp,
  neonShadow,
  previewNeonShadow,
  widthToHeight,
} from './neonDesigner/utils'

export default function NeonDesigner({ open, onClose }) {
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  )
  const [text, setText] = useState('Hello')
  const [align, setAlign] = useState('center')
  const [font, setFont] = useState('Cudi')
  const [fontMenuOpen, setFontMenuOpen] = useState(false)
  const [lightsOn, setLightsOn] = useState(true)
  const [colorId, setColorId] = useState('cream')
  const [width, setWidth] = useState(26)
  const [height, setHeight] = useState(8)
  const [manualSize, setManualSize] = useState(false)
  const [locationId, setLocationId] = useState('indoors')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 })
  const [draggingPreview, setDraggingPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const previewSceneRef = useRef(null)
  const previewTextRef = useRef(null)
  const dragStateRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(event) {
      if (event.key !== 'Escape') return
      if (previewOpen) {
        setPreviewOpen(false)
        return
      }
      onClose?.()
    }

    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose, previewOpen])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    function handleResize() {
      setIsMobileView(window.innerWidth < 640)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!draggingPreview) return undefined

    function handlePointerMove(event) {
      const scene = previewSceneRef.current
      const textBox = previewTextRef.current
      const dragState = dragStateRef.current
      if (!scene || !textBox || !dragState) return

      const sceneRect = scene.getBoundingClientRect()
      const textRect = textBox.getBoundingClientRect()
      const maxX = sceneRect.width / 2
      const minY = -(dragState.baseTop - 24)
      const maxY = sceneRect.height - dragState.baseTop - textRect.height - 24

      const nextX = clamp(
        dragState.startPosition.x + (event.clientX - dragState.pointerStart.x),
        -maxX,
        maxX,
      )
      const nextY = clamp(
        dragState.startPosition.y + (event.clientY - dragState.pointerStart.y),
        minY,
        maxY,
      )

      setPreviewPosition({ x: nextX, y: nextY })
    }

    function handlePointerUp() {
      dragStateRef.current = null
      setDraggingPreview(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [draggingPreview])

  const activeColor = useMemo(
    () => colors.find((color) => color.id === colorId) ?? colors[0],
    [colorId],
  )
  const activeFont = useMemo(
    () => fonts.find((option) => option.id === font) ?? fonts[0],
    [font],
  )
  const activeLocation = useMemo(
    () => locations.find((location) => location.id === locationId) ?? locations[0],
    [locationId],
  )
  const activeFontLabel = activeFont.label || activeFont.name || font
  const activePresetId = useMemo(
    () =>
      sizePresets.find((preset) => preset.w === width && preset.h === height)?.id,
    [height, width],
  )

  const lines = text.split('\n')
  const longestLineLength = Math.max(
    1,
    ...lines.map((line) => line.trim().length || 1),
  )
  const sizeScale = (width / MIN_W + height / 8) / 2
  const basePreviewFontSize = clamp(
    Math.round(48 + (sizeScale - 1) * 30),
    40,
    220,
  )
  const mobileLineCap = clamp(Math.round(520 / longestLineLength), 46, 88)
  const previewFontSize = isMobileView
    ? mobileLineCap
    : basePreviewFontSize
  const stagedPreviewFontSize = clamp(
    isMobileView
      ? Math.round(mobileLineCap * 0.7)
      : Math.round(30 + (sizeScale - 1) * 18),
    28,
    120,
  )
  const displayColor = lightsOn ? activeColor.value : '#ffffff'
  const displayShadow = lightsOn ? neonShadow(activeColor.value) : 'none'
  const previewDisplayShadow = lightsOn
    ? previewNeonShadow(activeColor.value)
    : 'none'
  const textAlignClass =
    align === 'left'
      ? 'items-start text-left'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-center text-center'

  function applyPreset(preset) {
    setWidth(preset.w)
    setHeight(preset.h)
  }

  function handleSlider(event) {
    const nextWidth = Number(event.target.value)
    setWidth(nextWidth)
    setHeight(widthToHeight(nextWidth))
  }

  function handlePreviewDragStart(event) {
    const scene = previewSceneRef.current
    if (!scene) return

    event.preventDefault()

    const sceneRect = scene.getBoundingClientRect()
    dragStateRef.current = {
      pointerStart: { x: event.clientX, y: event.clientY },
      startPosition: previewPosition,
      baseTop: sceneRect.height * 0.18,
    }
    setDraggingPreview(true)
  }

  async function handleFinishDesign() {
    setSaveMessage('')
    setIsSaving(true)

    try {
      const result = await saveDesignOrder({
        text,
        alignment: align,
        fontId: font,
        fontName: activeFontLabel,
        colorId,
        colorName: activeColor.name,
        widthCm: width,
        heightCm: height,
        locationId,
        locationLabel: activeLocation.label,
        quotedPrice: QUOTED_PRICE,
      })

      const submittedDate = new Date(result.submittedAt)
      setSaveMessage(
        `Saved on ${submittedDate.toLocaleDateString()} at ${submittedDate.toLocaleTimeString()}.`,
      )
    } catch (error) {
      setSaveMessage(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div
      aria-hidden={!open}
      className={[
        'fixed inset-0 z-[130] flex flex-col overflow-y-auto bg-[#001E2B] text-white transition-opacity duration-300 ease-out lg:flex-row lg:overflow-hidden',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
    >
      <DesignerCanvas
        activeColor={activeColor}
        activeFont={activeFont}
        displayColor={displayColor}
        displayShadow={displayShadow}
        height={height}
        isMobileView={isMobileView}
        isSaving={isSaving}
        lines={lines}
        onClose={onClose}
        onFinishDesign={handleFinishDesign}
        onOpenPreview={() => setPreviewOpen(true)}
        previewFontSize={previewFontSize}
        saveMessage={saveMessage}
        textAlignClass={textAlignClass}
        width={width}
      />

      <DesignerControls
        activeFont={activeFont}
        activePresetId={activePresetId}
        align={align}
        alignments={alignments}
        applyPreset={applyPreset}
        colorId={colorId}
        colors={colors}
        font={font}
        fontMenuOpen={fontMenuOpen}
        fonts={fonts}
        handleSlider={handleSlider}
        height={height}
        locationId={locationId}
        locations={locations}
        manualSize={manualSize}
        setAlign={setAlign}
        setColorId={setColorId}
        setFont={setFont}
        setFontMenuOpen={setFontMenuOpen}
        setHeight={setHeight}
        setLocationId={setLocationId}
        setManualSize={setManualSize}
        setText={setText}
        setWidth={setWidth}
        sizePresets={sizePresets}
        text={text}
        width={width}
      />

      <DesignerPreviewModal
        activeColor={activeColor}
        activeFont={activeFont}
        displayColor={displayColor}
        draggingPreview={draggingPreview}
        handlePreviewDragStart={handlePreviewDragStart}
        lines={lines}
        lightsOn={lightsOn}
        onClose={() => setPreviewOpen(false)}
        onToggleLights={() => setLightsOn((value) => !value)}
        previewDisplayShadow={previewDisplayShadow}
        previewOpen={previewOpen}
        previewPosition={previewPosition}
        previewSceneRef={previewSceneRef}
        previewTextRef={previewTextRef}
        stagedPreviewFontSize={stagedPreviewFontSize}
        textAlignClass={textAlignClass}
      />
    </div>
  )
}
