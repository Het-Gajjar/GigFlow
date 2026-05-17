import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { User } from '../../../types/domain'
import type { UserState } from '../../../types/store'
import { getErrorMessage } from '../../../utils/errors'
import { fetchUsersRequest } from '../api/userApi'

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    return await fetchUsersRequest()
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Unable to load users'))
  }
})

const initialState: UserState = {
  items: [],
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.items = Array.isArray(action.payload) ? action.payload : []
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? null
      })
  },
})

export default userSlice.reducer
