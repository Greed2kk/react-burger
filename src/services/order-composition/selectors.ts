import type { StateSchema } from '@/components/app/store/types'

import type { OrderComposition } from '@/services/order-composition/types'

export const getOrderCompositionData = (state: StateSchema): OrderComposition =>
  state.orderComposition.orderComposition

export const getOrderCompositionDataError = (
  state: StateSchema,
): string | undefined => state.orderComposition.error

export const getOrderCompositionDataIsLoading = (
  state: StateSchema,
): boolean | undefined => state.orderComposition.isLoading
