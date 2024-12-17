import { createAsyncThunk } from '@reduxjs/toolkit'

import type { OrderResponse } from '@/services/order-details/types'

import { ordersSlug } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

export const createOrder = createAsyncThunk<OrderResponse, { data: string[] }>(
  'orderDetails/createOrder',
  async ({ data }) =>
    await api.post(ordersSlug, {
      ingredients: data,
    }),
)
