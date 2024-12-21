import { createSlice } from '@reduxjs/toolkit'

import type { AuthSchema } from './types'

import { register } from './regester'

const initialState: AuthSchema = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
        state.refreshToken = action.payload.refreshToken
        state.accessToken = action.payload.accessToken
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || ''
      })
  },
})

const { reducer: authReducer } = authSlice

export default authReducer
