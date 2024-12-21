import { createAsyncThunk } from '@reduxjs/toolkit'

import { loginPath } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

import { AuthData, AuthResponse } from './types'

export const login = createAsyncThunk<AuthResponse, AuthData>(
  'auth/login',
  async data => await api.post(loginPath, data),
)
