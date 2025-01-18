import { createAsyncThunk } from '@reduxjs/toolkit'

import { logoutPath } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

import { LogoutData, SuccessResponse } from './types'

export const logout = createAsyncThunk<SuccessResponse, LogoutData>(
  'auth/logout',
  async data => await api.post(logoutPath, data),
)
