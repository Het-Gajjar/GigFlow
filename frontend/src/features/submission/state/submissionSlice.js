import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { createSubmissionRequest, fetchSubmissionsRequest, reviewSubmissionRequest } from '../api/submissionApi'

export const createSubmission = createAsyncThunk('submissions/create', async (payload, { rejectWithValue }) => {
  try {
    return await createSubmissionRequest(payload)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchSubmissions = createAsyncThunk('submissions/fetch', async (_, { rejectWithValue }) => {
  try {
    return await fetchSubmissionsRequest()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const reviewSubmission = createAsyncThunk('submissions/review', async (payload, { rejectWithValue }) => {
  try {
    return await reviewSubmissionRequest(payload)
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const submissionSlice = createSlice({
  name: 'submissions',
  initialState: {
    items: [],
    loading: false,
    submitting: false,
    reviewing: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading = false
        state.items = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload || 'Unable to load submissions')
      })
      .addCase(createSubmission.pending, (state) => {
        state.submitting = true
        state.error = null
      })
      .addCase(createSubmission.fulfilled, (state, action) => {
        state.submitting = false
        state.items.unshift(action.payload)
        toast.success('Work submitted successfully')
      })
      .addCase(createSubmission.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload
        toast.error(action.payload || 'Unable to submit work')
      })
      .addCase(reviewSubmission.pending, (state) => {
        state.reviewing = true
      })
      .addCase(reviewSubmission.fulfilled, (state, action) => {
        state.reviewing = false
        state.items = state.items.map((item) => (item._id === action.payload._id ? action.payload : item))
        toast.success('Submission reviewed')
      })
      .addCase(reviewSubmission.rejected, (state, action) => {
        state.reviewing = false
        state.error = action.payload
        toast.error(action.payload || 'Unable to review submission')
      })
  },
})

export default submissionSlice.reducer
