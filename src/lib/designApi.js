const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '')

export async function saveDesignOrder(payload) {
  let response

  try {
    response = await fetch(`${API_URL}/api/design-orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      'The design service could not be reached. Make sure the backend is running and VITE_API_URL is correct.',
    )
  }

  if (!response.ok) {
    let message = 'Unable to save your design.'
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
