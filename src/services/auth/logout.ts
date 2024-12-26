import { createAsyncThunk } from '@reduxjs/toolkit'

import { logoutPath } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

import { LogoutData, LogoutResponse } from './types'

export const logout = createAsyncThunk<LogoutResponse, LogoutData>(
  'auth/logout',
  async data => await api.post(logoutPath, data),
)
