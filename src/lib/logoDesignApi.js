const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '')
const DEVICE_ID_STORAGE_KEY = 'createneon.deviceId'

function createDeviceId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `device-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

function getDeviceId() {
  if (typeof window === 'undefined') {
    return 'server-render'
  }

  const existing = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY)
  if (existing) {
    return existing
  }

  const nextId = createDeviceId()
  window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, nextId)
  return nextId
}

export async function saveLogoDesignQuote(payload) {
  let response

  try {
    response = await fetch(`${API_URL}/api/logo-design`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-Id': getDeviceId(),
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      'The logo design service could not be reached. Make sure the backend is running and VITE_API_URL is correct.',
    )
  }

  if (!response.ok) {
    let message = 'Unable to save your logo design quote.'

    try {
      const body = await response.json()
      if (body?.error) {
        message = body.error
      }
    } catch {
      // Ignore body parse errors and use the default message.
    }

    throw new Error(message)
  }

  return await response.json()
}
