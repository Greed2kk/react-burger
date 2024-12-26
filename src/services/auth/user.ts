import { createAsyncThunk } from '@reduxjs/toolkit'

import { userPath } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

import { User } from './types'

export const user = createAsyncThunk<{ user: User }>(
  'auth/user',
  async () => await api.get(userPath),
)
