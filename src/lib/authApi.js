const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '')

// Verifies credentials against the backend.
// Returns `{ token, user }` on success, null on invalid credentials,
// and throws for network/server errors.
export async function verifyUserPassword({ username, password }) {
  let response

  try {
    response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
  } catch {
    throw new Error(
      'The login service could not be reached. Make sure the backend is running and VITE_API_URL is correct.',
    )
  }

  if (response.status === 401) {
    return null
  }

  if (!response.ok) {
    let message = 'Unable to verify login.'
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
