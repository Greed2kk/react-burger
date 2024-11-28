import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

import { ThunkExtraArgs } from '../../components/app/store/store'

import { ordersSlug } from '../../utils/api/constants'

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
    addOrderDetails: create.asyncThunk<
      OrderDetails,
      { data: string[] },
      {
        rejectValue: string
        extra: ThunkExtraArgs<OrderDetails, { ingredients: string[] }>
      }
    >(
      async ({ data }, { rejectWithValue, extra }) => {
        try {
          return await extra.api.post(ordersSlug, {
            ingredients: data,
          })
        } catch (error: any) {
          if (error.name !== 'AbortError') {
            return rejectWithValue('Request was aborted')
          }

          return rejectWithValue(error.message)
        }
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
