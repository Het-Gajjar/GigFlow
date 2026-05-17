import api from '../../../services/api'
import type { ApiResponse, User } from '../../../types/domain'

const usersEndpoint = import.meta.env.VITE_USERS_ENDPOINT || '/users'

export const fetchUsersRequest = async (): Promise<User[]> => {
  const { data } = await api.get<ApiResponse<User[]>>(usersEndpoint)
  return data.users || data.data || []
}
