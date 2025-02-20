import { createAsyncThunk } from '@reduxjs/toolkit'

import { OrderCompositionResponse } from '@/services/order-composition/types'

import { ordersSlug } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

export const getOrderComposition = createAsyncThunk<
  OrderCompositionResponse,
  { orderNumber: string }
>(
  'orderComposition/getOrderComposition',
  async ({ orderNumber }) => await api.get(ordersSlug, {}, orderNumber),
)
