import api from '../../../services/api'

const adminTasksEndpoint = import.meta.env.VITE_ADMIN_TASKS_ENDPOINT || '/task/myTask'
const userTasksEndpoint = import.meta.env.VITE_USER_TASKS_ENDPOINT || '/task/myTask'

export const fetchTasksRequest = async ({ role } = {}) => {
  const endpoint = role === 'admin' ? adminTasksEndpoint : userTasksEndpoint
  const { data } = await api.get(endpoint)
  return data.tasks || data.data || data
}

export const createTaskRequest = async (payload) => {
  const { data } = await api.post('/task/create', payload)
  return data.task || data.data || data
}

export const updateTaskRequest = async ({ id, updates }) => {
  const { data } = await api.patch(`/task/${id}/status`, updates)
  return data.task || data.data || data
}

export const updateTaskDetailsRequest = async ({ id, updates }) => {
  const { data } = await api.put(`/task/${id}`, updates)
  return data.task || data.data || data
}

export const deleteTaskRequest = async (id) => {
  const { data } = await api.delete(`/task/${id}`)
  return data
}
