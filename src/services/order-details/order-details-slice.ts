import { createSlice } from '@reduxjs/toolkit'

import { createOrder } from '@/services/order-details/create-order'
import type { OrderDetailsSchema } from '@/services/order-details/types'

export const initialState: OrderDetailsSchema = {
  isLoading: false,
  orderDetails: {
    order: {
      number: 0,
    },
    name: '',
    success: false,
  },
}

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearDetailsData: state => {
      state.isLoading = false
      state.error = undefined
      state.orderDetails = initialState.orderDetails
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.orderDetails = payload
        state.isLoading = false
      })
      .addCase(createOrder.rejected, state => {
        state.isLoading = false
        state.error = 'Something went wrong'
      })
  },
})

const { reducer: orderDetailsReducer, actions: orderActions } = orderDetailsSlice

export const { clearDetailsData } = orderActions

export default orderDetailsReducer
