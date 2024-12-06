import type { StateSchema } from '../../components/app/store/types'

import { Order, OrderDetailsSchema } from './types'

export const getOrderNumber = (state: StateSchema): Order['number'] =>
  state.orderDetails.orderDetails.order.number

export const getOrderError = (
  state: StateSchema,
): OrderDetailsSchema['error'] => state.orderDetails.error

export const getOrderIsLoading = (
  state: StateSchema,
): OrderDetailsSchema['isLoading'] => state.orderDetails.isLoading
