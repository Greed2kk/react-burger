import { createAsyncThunk } from '@reduxjs/toolkit'

import { userPath } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

import { User } from './types'

export const userUpdate = createAsyncThunk<{ user: User }, Partial<User>>(
  'auth/userUpdate',
  async data => await api.patch(userPath, data),
)
