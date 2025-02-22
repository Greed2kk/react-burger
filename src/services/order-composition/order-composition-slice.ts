import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { getOrderComposition } from '@/services/order-composition/get-order-composition'
import {
  OrderComposition,
  OrderCompositionSchema,
} from '@/services/order-composition/types'

export const initialState: OrderCompositionSchema = {
  orderComposition: {
    number: 0,
    name: '',
    ingredients: [],
    status: 'done',
    createdAt: '',
  },
}

const orderCompositionSlice = createSlice({
  name: 'orderComposition',
  initialState,
  reducers: {
    addOrderCompositionData: (
      state,
      { payload }: PayloadAction<OrderComposition>,
    ) => {
      state.orderComposition = payload
    },
    clearOrderCompositionData: state => {
      state.orderComposition = initialState.orderComposition
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getOrderComposition.pending, state => {
        state.isLoading = true
      })
      .addCase(getOrderComposition.fulfilled, (state, { payload }) => {
        state.orderComposition = payload.orders[0]
        state.isLoading = false
      })
      .addCase(getOrderComposition.rejected, state => {
        state.isLoading = false
        state.error = 'Something went wrong'
      })
  },
})

const { reducer: orderCompositionReducer, actions } = orderCompositionSlice

export const { addOrderCompositionData, clearOrderCompositionData } = actions

export default orderCompositionReducer
