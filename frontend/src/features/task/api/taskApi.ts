import api from '../../../services/api'
import type { ApiResponse, CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '../../../types/domain'

const adminTasksEndpoint = import.meta.env.VITE_ADMIN_TASKS_ENDPOINT || '/task/myTask'
const userTasksEndpoint = import.meta.env.VITE_USER_TASKS_ENDPOINT || '/task/myTask'

export interface FetchTasksParams {
  role?: 'admin' | 'user'
}

export const fetchTasksRequest = async ({ role }: FetchTasksParams = {}): Promise<Task[]> => {
  const endpoint = role === 'admin' ? adminTasksEndpoint : userTasksEndpoint
  const { data } = await api.get<ApiResponse<Task[]>>(endpoint)
  return data.tasks || data.data || []
}

export const createTaskRequest = async (payload: CreateTaskPayload): Promise<Task> => {
  const { data } = await api.post<ApiResponse<Task>>('/task/create', payload)
  return (data.task || data.data) as Task
}

export const updateTaskRequest = async ({ id, updates }: { id: string; updates: { status: TaskStatus } }): Promise<Task> => {
  const { data } = await api.patch<ApiResponse<Task>>(`/task/${id}/status`, updates)
  return (data.task || data.data) as Task
}

export const updateTaskDetailsRequest = async ({ id, updates }: { id: string; updates: UpdateTaskPayload }): Promise<Task> => {
  const { data } = await api.put<ApiResponse<Task>>(`/task/${id}`, updates)
  return (data.task || data.data) as Task
}

export const deleteTaskRequest = async (id: string): Promise<ApiResponse> => {
  const { data } = await api.delete<ApiResponse>(`/task/${id}`)
  return data
}
