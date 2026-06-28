const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/+$/, '')

export async function fetchDesignOrders(token) {
  let response

  try {
    response = await fetch(`${API_URL}/api/design-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch {
    throw new Error('The orders service could not be reached.')
  }

  if (!response.ok) {
    let message = 'Unable to load design orders.'
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

  const body = await response.json()
  return Array.isArray(body?.orders) ? body.orders : []
}

async function fetchOrdersStreamToken(token) {
  let response

  try {
    response = await fetch(`${API_URL}/api/auth/stream-token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
  } catch {
    throw new Error('The live orders feed could not be initialized.')
  }

  if (!response.ok) {
    let message = 'Unable to initialize the live orders feed.'
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

  const body = await response.json()
  if (!body?.token) {
    throw new Error('Unable to initialize the live orders feed.')
  }

  return body.token
}

export function subscribeToDesignOrders(token, { onOrderCreated, onError } = {}) {
  if (typeof window === 'undefined' || typeof EventSource === 'undefined') {
    return () => {}
  }

  let closed = false
  let stream = null

  fetchOrdersStreamToken(token)
    .then((streamToken) => {
      if (closed) {
        return
      }

      const streamUrl = new URL(`${API_URL}/api/design-orders/stream`)
      streamUrl.searchParams.set('token', streamToken)
      stream = new EventSource(streamUrl)

      stream.addEventListener('order.created', (event) => {
        try {
          const body = JSON.parse(event.data)
          if (body?.order) {
            onOrderCreated?.(body.order)
          }
        } catch {
          // Ignore malformed events and wait for the next one.
        }
      })

      stream.onerror = () => {
        if (!closed) {
          onError?.(new Error('The live orders feed was disconnected.'))
        }
      }
    })
    .catch((error) => {
      if (!closed) {
        onError?.(error)
      }
    })

  return () => {
    closed = true
    stream?.close()
  }
}
