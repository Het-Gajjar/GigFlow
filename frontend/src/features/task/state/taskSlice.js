import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import {
  createTaskRequest,
  deleteTaskRequest,
  fetchTasksRequest,
  updateTaskRequest,
} from '../api/taskApi'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (params, { rejectWithValue }) => {
  try {
    return await fetchTasksRequest(params)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const createTask = createAsyncThunk('tasks/createTask', async (payload, { rejectWithValue }) => {
  try {
    return await createTaskRequest(payload)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updateTask = createAsyncThunk('tasks/updateTask', async (payload, { rejectWithValue }) => {
  try {
    return await updateTaskRequest(payload)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
  try {
    await deleteTaskRequest(id)
    return id
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: null,
    activeStatus: 'all',
  },
  reducers: {
    setActiveStatus: (state, action) => {
      state.activeStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.items = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || 'Unable to load tasks')
      })
      .addCase(createTask.pending, (state) => {
        state.creating = true
        state.error = null
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.creating = false
        state.items.unshift(action.payload)
        toast.success('Task created successfully')
      })
      .addCase(createTask.rejected, (state, action) => {
        state.creating = false
        state.error = action.payload
        toast.error(action.payload || 'Unable to create task')
      })
      .addCase(updateTask.pending, (state) => {
        state.updating = true
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updating = false
        state.items = state.items.map((task) => (task._id === action.payload._id ? action.payload : task))
        toast.success('Task updated successfully')
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updating = false
        state.error = action.payload
        toast.error(action.payload || 'Unable to update task')
      })
      .addCase(deleteTask.pending, (state) => {
        state.deleting = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleting = false
        state.items = state.items.filter((task) => task._id !== action.payload)
        toast.success('Task deleted successfully')
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleting = false
        state.error = action.payload
        toast.error(action.payload || 'Unable to delete task')
      })
  },
})

export const { setActiveStatus } = taskSlice.actions
export default taskSlice.reducer
