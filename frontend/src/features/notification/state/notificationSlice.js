import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { fetchNotificationsRequest, markNotificationReadRequest } from '../api/notificationApi'

export const fetchNotifications = createAsyncThunk('notifications/fetch', async (_, { rejectWithValue }) => {
  try {
    return await fetchNotificationsRequest()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const markNotificationsRead = createAsyncThunk('notifications/read', async (id, { rejectWithValue }) => {
  try {
    return await markNotificationReadRequest(id)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    notificationReceived: (state, action) => {
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
        state.error = action.payload
      })
      .addCase(markNotificationsRead.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload) ? action.payload : state.items.map((item) => ({ ...item, read: true }))
      })
  },
})

export const { notificationReceived } = notificationSlice.actions
export default notificationSlice.reducer
