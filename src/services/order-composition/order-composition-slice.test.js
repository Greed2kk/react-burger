import { getOrderComposition } from '@/services/order-composition/get-order-composition'

import orderCompositionReducer, {
  addOrderCompositionData,
  clearOrderCompositionData,
} from './order-composition-slice'

describe('orderCompositionSlice', () => {
  const initialState = {
    orderComposition: {
      number: 0,
      name: '',
      ingredients: [],
      status: 'done',
      createdAt: '',
    },
  }

  const mockOrder = {
    number: 69134,
    name: 'Краторный spicy бургер',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0942', '643d69a5c3f7b9001cfa093c'],
    status: 'done',
    createdAt: '2025-02-22T00:42:28.045Z',
  }

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
