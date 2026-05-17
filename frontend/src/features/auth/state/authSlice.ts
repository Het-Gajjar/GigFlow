import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { clearAuthState, loadAuthState, persistAuthState } from '../../../services/storage'
import type { AuthPayload, AuthResponse, RegisterPayload } from '../../../types/domain'
import type { AuthState } from '../../../types/store'
import { getErrorMessage } from '../../../utils/errors'
import { loginRequest, registerRequest } from '../api/authApi'

const storedAuth = loadAuthState()

export const login = createAsyncThunk<AuthResponse, AuthPayload, { rejectValue: string }>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    return await loginRequest(payload)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Login failed'))
  }
})

export const registerUser = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    return await registerRequest(payload)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Registration failed'))
  }
})

const initialState: AuthState = {
  user: storedAuth.user,
  token: storedAuth.token,
  isAuthenticated: Boolean(storedAuth.token),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      clearAuthState()
      toast.success('Logged out successfully')
    },
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        persistAuthState({ user: action.payload.user, token: action.payload.token })
        toast.success('Login successful')
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
        toast.error(action.payload || 'Login failed')
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        persistAuthState({ user: action.payload.user, token: action.payload.token })
        toast.success('Registration successful')
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
        toast.error(action.payload || 'Registration failed')
      })
  },
})

export const { clearAuthError, logout } = authSlice.actions
export default authSlice.reducer
