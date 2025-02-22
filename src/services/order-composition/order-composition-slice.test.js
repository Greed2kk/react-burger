import { getOrderComposition } from '@/services/order-composition/get-order-composition'

import orderCompositionReducer, {
  addOrderCompositionData,
  clearOrderCompositionData,
  initialState,
} from './order-composition-slice'

import { mockOrder } from '@/__mocks__/order'

describe('orderCompositionSlice', () => {
  it('should return the initial state', () => {
    expect(orderCompositionReducer(undefined, { type: undefined })).toEqual(
      initialState,
    )
  })

  it('should handle addOrderCompositionData', () => {
    const action = addOrderCompositionData(mockOrder)
    const state = orderCompositionReducer(initialState, action)

    expect(state.orderComposition).toEqual(mockOrder)
  })

  it('should handle clearOrderCompositionData', () => {
    const populatedState = { orderComposition: mockOrder }
    const action = clearOrderCompositionData()
    const state = orderCompositionReducer(populatedState, action)

    expect(state).toEqual(initialState)
  })

  it('should handle getOrderComposition.pending', () => {
    const action = { type: getOrderComposition.pending.type }
    const state = orderCompositionReducer(initialState, action)

    expect(state.isLoading).toBe(true)
  })

  it('should handle getOrderComposition.fulfilled', () => {
    const action = {
      type: getOrderComposition.fulfilled.type,
      payload: { orders: [mockOrder] },
    }
    const state = orderCompositionReducer(initialState, action)

    expect(state.orderComposition).toEqual(mockOrder)
    expect(state.isLoading).toBe(false)
  })

  it('should handle getOrderComposition.rejected', () => {
    const action = { type: getOrderComposition.rejected.type }
    const state = orderCompositionReducer(initialState, action)

    expect(state.isLoading).toBe(false)
    expect(state.error).toBe('Something went wrong')
  })
})
