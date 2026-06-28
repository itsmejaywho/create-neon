export const MIN_W = 26
export const MAX_W = 300
export const MIN_H = 5
export const MAX_H = 95
const SIZE_RATIO = 8 / 26

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function widthToHeight(width) {
  return clamp(Math.round(width * SIZE_RATIO), MIN_H, MAX_H)
}

export function neonShadow(color) {
  return [
    '0 0 1px #fff',
    `0 0 4px ${color}`,
    `0 0 8px ${color}`,
    `0 0 14px ${color}`,
  ].join(', ')
}

export function previewNeonShadow(color) {
  return [
    `0 0 2px ${color}`,
    `0 0 8px ${color}`,
    `0 0 18px ${color}`,
    `0 0 28px ${color}`,
  ].join(', ')
}
