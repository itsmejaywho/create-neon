export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(value, options = {}) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    ...options,
  }).format(new Date(value))
}

export function truncate(value, maxLength = 80) {
  if (!value || value.length <= maxLength) return value ?? ''

  return `${value.slice(0, maxLength).trim()}...`
}

export function capitalize(value) {
  if (!value) return ''

  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}
