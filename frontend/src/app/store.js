import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/state/authSlice'
import notificationReducer from '../features/notification/state/notificationSlice'
import submissionReducer from '../features/submission/state/submissionSlice'
import taskReducer from '../features/task/state/taskSlice'
import userReducer from '../features/user/state/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
    submissions: submissionReducer,
    tasks: taskReducer,
    users: userReducer,
  },
})
