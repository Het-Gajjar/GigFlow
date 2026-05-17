import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import type { Notification } from '../../../types/domain'
import type { NotificationState } from '../../../types/store'
import { getErrorMessage } from '../../../utils/errors'
import { fetchNotificationsRequest, markNotificationReadRequest } from '../api/notificationApi'

export const fetchNotifications = createAsyncThunk<Notification[], void, { rejectValue: string }>('notifications/fetch', async (_, { rejectWithValue }) => {
  try {
    return await fetchNotificationsRequest()
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to load notifications'))
  }
})

export const markNotificationsRead = createAsyncThunk<Notification[], string | undefined, { rejectValue: string }>('notifications/read', async (id, { rejectWithValue }) => {
  try {
    return await markNotificationReadRequest(id)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to update notifications'))
  }
})

const initialState: NotificationState = {
  items: [],
  loading: false,
  error: null,
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationReceived: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload)
      toast.success(action.payload.message || action.payload.title || 'New notification')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.items = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
      })
      .addCase(markNotificationsRead.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload) ? action.payload : state.items.map((item) => ({ ...item, read: true }))
      })
  },
})

export const { notificationReceived } = notificationSlice.actions
export default notificationSlice.reducer
