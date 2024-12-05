import { createAsyncThunk } from '@reduxjs/toolkit'

import { ordersSlug } from '../../utils/api/constants'
import { api } from '../../utils/api/request'

import type { OrderResponse } from './types'

export const createOrder = createAsyncThunk<OrderResponse, { data: string[] }>(
  'orderDetails/createOrder',
  async ({ data }) =>
    await api.post(ordersSlug, {
      ingredients: data,
    }),
)
