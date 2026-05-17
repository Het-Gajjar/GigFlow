import api from '../../../services/api'

const usersEndpoint = import.meta.env.VITE_USERS_ENDPOINT || '/users'

export const fetchUsersRequest = async () => {
  const { data } = await api.get(usersEndpoint)
  return data.users || data.data || data
}
