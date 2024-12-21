import { createAsyncThunk } from '@reduxjs/toolkit'

import { registerPath } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

import type { RegisterData, RegisterResponse } from './types'

export const register = createAsyncThunk<RegisterResponse, RegisterData>(
  'auth/register',
  async data => await api.post(registerPath, data),
)
