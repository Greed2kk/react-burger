import { createSlice } from '@reduxjs/toolkit'

import type { AuthSchema } from './types'

import { login } from './login'
import { register } from './register'

const initialState: AuthSchema = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const updateTokens = (
  state: AuthSchema,
  accessToken: string,
  refreshToken: string,
): void => {
  state.accessToken = accessToken
  state.refreshToken = refreshToken
  state.isAuthenticated = true

  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, { payload }) {
      const { accessToken } = payload

      state.accessToken = accessToken
      state.isAuthenticated = true

      localStorage.setItem('accessToken', accessToken)
    },
    setRefreshToken(state, { payload }) {
      const { refreshToken } = payload

      state.refreshToken = refreshToken
      state.isAuthenticated = true

      localStorage.setItem('refreshToken', refreshToken)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user
        updateTokens(
          state,
          action.payload.accessToken,
          action.payload.refreshToken,
        )
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || ''
      })
      .addCase(login.pending, state => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user

        updateTokens(
          state,
          action.payload.accessToken,
          action.payload.refreshToken,
        )
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || ''
      })
  },
})

const { reducer: authReducer } = authSlice

export default authReducer
