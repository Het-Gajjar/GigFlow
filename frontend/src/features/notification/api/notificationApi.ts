import api from '../../../services/api'
import type { ApiResponse, Notification } from '../../../types/domain'

export const fetchNotificationsRequest = async (): Promise<Notification[]> => {
  const { data } = await api.get<ApiResponse<Notification[]>>('/notifications')
  return data.notifications || data.data || []
}

export const markNotificationReadRequest = async (id = 'all'): Promise<Notification[]> => {
  const endpoint = id === 'all' ? '/notifications/read/all' : `/notifications/read/${id}`
  const { data } = await api.patch<ApiResponse<Notification[]>>(endpoint)
  return data.notifications || data.data || []
}
