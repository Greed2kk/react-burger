import { createAsyncThunk } from '@reduxjs/toolkit'

import { registerPath } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

import type { AuthResponse,RegisterData } from './types'

export const register = createAsyncThunk<AuthResponse, RegisterData>(
  'auth/register',
  async data => await api.post(registerPath, data),
)
