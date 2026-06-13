const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY

export async function verifyUserPassword({ username, password }) {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Supabase login settings are missing.')
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/verify_user_password`,
    {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input_username: username,
        input_password: password,
      }),
    },
  )

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Unable to verify login.')
  }

  const users = await response.json()
  return users[0] ?? null
}
