import type { TaskStatus, User } from '../types/domain'

export const TASK_STATUSES = [
  { label: 'Pending', value: 'pending' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
] as const

export const TASK_PRIORITIES = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
] as const

export const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  'in-progress': 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
} as const

export const readableStatus = (status: TaskStatus) =>
  TASK_STATUSES.find((item) => item.value === status)?.label || status

export const getAssignedUserName = (assignedTo?: User | string) => {
  if (!assignedTo) return 'Unassigned'
  if (typeof assignedTo === 'string') return assignedTo

  return assignedTo.name || assignedTo.email || 'Unassigned'
}

export const getAssignedUserEmail = (assignedTo?: User | string) => {
  if (!assignedTo || typeof assignedTo === 'string') return ''
  return assignedTo.email || ''
}
