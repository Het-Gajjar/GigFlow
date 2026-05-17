import api from '../../../services/api'

export const fetchNotificationsRequest = async () => {
  const { data } = await api.get('/notifications')
  return data.notifications || data.data || data
}

export const markNotificationReadRequest = async (id = 'all') => {
  const endpoint = id === 'all' ? '/notifications/read/all' : `/notifications/read/${id}`
  const { data } = await api.patch(endpoint)
  return data.notifications || data.data || data
}
