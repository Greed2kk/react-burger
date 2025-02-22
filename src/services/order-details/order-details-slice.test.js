import { createOrder } from '@/services/order-details/create-order'

import orderDetailsReducer, { clearDetailsData, initialState } from './order-details-slice'

describe('orderDetailsSlice', () => {
  const mockOrderResponse = {
    order: { number: 69134 },
    name: 'Краторный spicy бургер\n',
    success: true,
  }

  it('should return the initial state', () => {
    expect(orderDetailsReducer(undefined, { type: undefined })).toEqual(
      initialState,
    )
  })

  it('should handle clearDetailsData', () => {
    const modifiedState = {
      isLoading: true,
      orderDetails: mockOrderResponse,
      error: 'Some error',
    }

    const action = clearDetailsData()
    const state = orderDetailsReducer(modifiedState, action)

    expect(state).toEqual(initialState)
  })

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type }
    const state = orderDetailsReducer(initialState, action)

    expect(state.isLoading).toBe(true)
  })

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrderResponse,
    }
    const state = orderDetailsReducer(initialState, action)

    expect(state.orderDetails).toEqual(mockOrderResponse)
    expect(state.isLoading).toBe(false)
  })

  it('should handle createOrder.rejected', () => {
    const action = { type: createOrder.rejected.type }
    const state = orderDetailsReducer(initialState, action)

    expect(state.isLoading).toBe(false)
    expect(state.error).toBe('Something went wrong')
  })
})
