import type { AuthResponse } from '../types/domain'

const AUTH_STORAGE_KEY = 'gigflow_auth'

type StoredAuth = Pick<AuthResponse, 'user' | 'token'> | { user: null; token: null }

export const loadAuthState = (): StoredAuth => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : { user: null, token: null }
  } catch {
    return { user: null, token: null }
  }
}

export const persistAuthState = ({ user, token }: Pick<AuthResponse, 'user' | 'token'>) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }))
}

export const clearAuthState = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
