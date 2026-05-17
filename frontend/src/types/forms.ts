import type { Role, TaskPriority, TaskStatus } from './domain'

export interface LoginFormValues {
  email: string
  password: string
}

export interface RegisterFormValues extends LoginFormValues {
  name: string
  role: Role
}

export interface TaskFormValues {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignedTo: string
  dueDate: string
}

export interface SubmissionFormValues {
  description: string
  fileUrl: string
  comments: string
  file: FileList
}
