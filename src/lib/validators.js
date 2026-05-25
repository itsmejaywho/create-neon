export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim() !== ''
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function minLength(value, length) {
  return String(value ?? '').length >= length
}

export function validateLoginForm(values) {
  const errors = {}

  if (!isEmail(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!minLength(values.password, 8)) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return errors
}
