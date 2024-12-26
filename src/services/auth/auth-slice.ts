import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { logout } from '@/services/auth/logout'

import {
  accessTokenKey,
  isResetPasswordKey,
  refreshTokenKey,
} from '@/utils/api/constants'
import resetStorage from '@/utils/helpers/resetStorage'

import type { AuthSchema } from './types'

import { login } from './login'
import { register } from './register'
import { user } from './user'

const initialState: AuthSchema = {
  user: { name: '', email: '' },
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isResetPassword: Boolean(localStorage.getItem(isResetPasswordKey)) || false,
}

const updateTokens = (
  state: AuthSchema,
  accessToken: string,
  refreshToken: string,
): void => {
  state.accessToken = accessToken
  state.refreshToken = refreshToken
  state.isAuthenticated = true

  localStorage.setItem(accessTokenKey, accessToken)
  localStorage.setItem(refreshTokenKey, refreshToken)
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserName(state, { payload }: PayloadAction<{ name: string }>) {
      state.user.name = payload.name
    },
    setUserEmail(state, { payload }: PayloadAction<{ email: string }>) {
      state.user.email = payload.email
    },
    setAccessToken(state, { payload }: PayloadAction<{ accessToken: string }>) {
      const { accessToken } = payload

      state.accessToken = accessToken
      state.isAuthenticated = true

      localStorage.setItem(accessTokenKey, accessToken)
    },
    setRefreshToken(
      state,
      { payload }: PayloadAction<{ refreshToken: string }>,
    ) {
      const { refreshToken } = payload

      state.refreshToken = refreshToken
      state.isAuthenticated = true

      localStorage.setItem(refreshTokenKey, refreshToken)
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
      .addCase(user.pending, state => {
        state.isLoading = true
      })
      .addCase(user.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false
      })
      .addCase(user.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || ''
      })
      .addCase(logout.pending, state => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, state => {
        resetStorage()
        Object.assign(state, initialState)
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || ''
      })
  },
})

const { reducer: authReducer, actions: authActions } = authSlice

export const { setAccessToken, setRefreshToken, setUserName, setUserEmail } =
  authActions

export default authReducer
