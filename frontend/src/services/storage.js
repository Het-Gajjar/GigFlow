const AUTH_STORAGE_KEY = 'gigflow_auth'

export const loadAuthState = () => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : { user: null, token: null }
  } catch {
    return { user: null, token: null }
  }
}

export const persistAuthState = ({ user, token }) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }))
}

export const clearAuthState = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
