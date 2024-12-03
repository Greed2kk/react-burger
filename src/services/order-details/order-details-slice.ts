import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

import { baseApiUrl, ordersSlug } from '../../utils/api/constants'
import { clearIngredients } from '../burger-constructor/burger-constructor-slice'
import { clearQuantity } from '../ingredients/ingredient-slice'

import { OrderDetails, OrderDetailsSchema } from './types'

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const initialState: OrderDetailsSchema = {
  isLoading: false,
}

export const orderDetailsSlice = createSliceWithThunks({
  name: 'orderDetails',
  initialState,
  reducers: create => ({
    addOrderDetails: create.asyncThunk<OrderDetails, { data: string[] }>(
      async ({ data }, { dispatch }) => {
        const response = await fetch(`${baseApiUrl}/${ordersSlug}`, {
          method: 'POST',
          body: JSON.stringify(data),
        })

        if (response.ok) {
          dispatch(clearQuantity())
          dispatch(clearIngredients())
        }

        return response.json()
      },
      {
        pending: state => {
          state.isLoading = true
        },
        rejected: (state, action) => {
          state.error = action.payload ?? action.error
        },
        fulfilled: (state, { payload }) => {
          const { name, order } = payload

          state.name = name
          state.order = order
        },
        settled: state => {
          state.isLoading = false
        },
      },
    ),
  }),

  selectors: {
    getOrderNumber: state => state.order?.number,
    getOrderName: state => state.name,
  },
})

export const {
  reducer: orderDetailsReducer,
  selectors: orderDetailsSelectors,
  actions: orderDetailsActions,
} = orderDetailsSlice

export const { addOrderDetails } = orderDetailsActions

export const { getOrderNumber } = orderDetailsSelectors
