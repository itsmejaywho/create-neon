const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const defaultHeaders = {
  'Content-Type': 'application/json',
}

async function request(endpoint, options = {}) {
  const { headers, body, ...restOptions } = options
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: body && typeof body !== 'string' ? JSON.stringify(body) : body,
    ...restOptions,
  })

  const contentType = response.headers.get('content-type')
  const data = contentType?.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    throw new Error(data?.message || response.statusText)
  }

  return data
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options) =>
    request(endpoint, { ...options, method: 'DELETE' }),
}

export { request }
