import type { Notification, Submission, Task, User } from './domain'

export interface AsyncState {
  loading: boolean
  error: string | null
}

export interface AuthState extends AsyncState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface TaskState extends AsyncState {
  items: Task[]
  creating: boolean
  updating: boolean
  deleting: boolean
  activeStatus: 'all' | Task['status']
}

export interface UserState extends AsyncState {
  items: User[]
}

export interface SubmissionState extends AsyncState {
  items: Submission[]
  submitting: boolean
  reviewing: boolean
}

export interface NotificationState extends AsyncState {
  items: Notification[]
}
