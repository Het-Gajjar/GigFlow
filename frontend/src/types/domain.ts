export type Role = 'admin' | 'user'

export type TaskStatus = 'pending' | 'in-progress' | 'completed'

export type TaskPriority = 'low' | 'medium' | 'high'

export type SubmissionStatus = 'pending' | 'reviewed' | 'approved' | 'rejected'

export interface User {
  _id: string
  id?: string
  name: string
  email: string
  role: Role
  createdAt?: string
  updatedAt?: string
}

export interface Task {
  _id: string
  title: string
  description: string
  status: TaskStatus
  priority?: TaskPriority
  dueDate?: string
  assignedTo?: User | string
  assignedBy?: User | string
  submission?: Submission | string | null
  createdAt?: string
  updatedAt?: string
}

export interface Submission {
  _id: string
  taskId: Task | string
  submittedBy: User | string
  description: string
  fileUrl?: string
  comments?: string
  feedback?: string
  submittedAt?: string
  status: SubmissionStatus
  createdAt?: string
  updatedAt?: string
}

export interface Notification {
  _id: string
  userId: string
  title: string
  message: string
  read: boolean
  createdAt?: string
  updatedAt?: string
}

export interface AuthPayload {
  email: string
  password: string
}

export interface RegisterPayload extends AuthPayload {
  name: string
  role: Role
}

export interface AuthResponse {
  user: User
  token: string
}

export interface CreateTaskPayload {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignedTo: string
  dueDate: string
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>

export interface CreateSubmissionPayload {
  taskId: string
  description: string
  fileUrl?: string
  comments?: string
  file?: File
}

export interface ReviewSubmissionPayload {
  id: string
  status: Exclude<SubmissionStatus, 'pending'>
  feedback?: string
}

export interface ApiResponse<T = unknown> {
  success?: boolean
  message?: string
  data?: T
  user?: User
  token?: string
  users?: User[]
  tasks?: Task[]
  task?: Task
  submissions?: Submission[]
  submission?: Submission
  notifications?: Notification[]
}
