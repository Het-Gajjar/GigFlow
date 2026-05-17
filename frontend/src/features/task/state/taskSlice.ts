import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  createTaskRequest,
  deleteTaskRequest,
  type FetchTasksParams,
  fetchTasksRequest,
  updateTaskDetailsRequest,
  updateTaskRequest,
} from '../api/taskApi'
import type { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '../../../types/domain'
import type { TaskState } from '../../../types/store'
import { getErrorMessage } from '../../../utils/errors'

export const fetchTasks = createAsyncThunk<Task[], FetchTasksParams | undefined, { rejectValue: string }>('tasks/fetchTasks', async (params, { rejectWithValue }) => {
  try {
    return await fetchTasksRequest(params)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to load tasks'))
  }
})

export const createTask = createAsyncThunk<Task, CreateTaskPayload, { rejectValue: string }>('tasks/createTask', async (payload, { rejectWithValue }) => {
  try {
    return await createTaskRequest(payload)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to create task'))
  }
})

export const updateTask = createAsyncThunk<Task, { id: string; updates: { status: TaskStatus } }, { rejectValue: string }>('tasks/updateTask', async (payload, { rejectWithValue }) => {
  try {
    return await updateTaskRequest(payload)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to update task'))
  }
})

export const updateTaskDetails = createAsyncThunk<Task, { id: string; updates: UpdateTaskPayload }, { rejectValue: string }>('tasks/updateTaskDetails', async (payload, { rejectWithValue }) => {
  try {
    return await updateTaskDetailsRequest(payload)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to update task'))
  }
})

export const deleteTask = createAsyncThunk<string, string, { rejectValue: string }>('tasks/deleteTask', async (id, { rejectWithValue }) => {
  try {
    await deleteTaskRequest(id)
    return id
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to delete task'))
  }
})

const initialState: TaskState = {
  items: [],
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
  activeStatus: 'all',
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setActiveStatus: (state, action: PayloadAction<TaskState['activeStatus']>) => {
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
        state.error = action.payload ?? null
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
        state.error = action.payload ?? null
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
        state.error = action.payload ?? null
        toast.error(action.payload || 'Unable to update task')
      })
      .addCase(updateTaskDetails.pending, (state) => {
        state.updating = true
        state.error = null
      })
      .addCase(updateTaskDetails.fulfilled, (state, action) => {
        state.updating = false
        state.items = state.items.map((task) => (task._id === action.payload._id ? action.payload : task))
        toast.success('Task updated successfully')
      })
      .addCase(updateTaskDetails.rejected, (state, action) => {
        state.updating = false
        state.error = action.payload ?? null
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
        state.error = action.payload ?? null
        toast.error(action.payload || 'Unable to delete task')
      })
  },
})

export const { setActiveStatus } = taskSlice.actions
export default taskSlice.reducer
