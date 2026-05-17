import api from '../../../services/api'
import type { AuthPayload, AuthResponse, ApiResponse, RegisterPayload } from '../../../types/domain'

export const loginRequest = async (payload: AuthPayload): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', payload)
  return { user: data.user!, token: data.token! }
}

export const registerRequest = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/register', payload)
  return { user: data.user!, token: data.token! }
}
