import { WebsocketStatus } from '@/services/middleware/socket-midleware'

import { feedOrdersWebSocketActions } from './actions'
import { feedOrdersSlice, initialState } from './feed-orders-slice'

describe('feedOrdersSlice', () => {
  const { reducer } = feedOrdersSlice

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
  })

  it('should handle onConnected action', () => {
    const action = feedOrdersWebSocketActions.onConnected()
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
      error: null,
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle onDisconnected action', () => {
    const action = feedOrdersWebSocketActions.onDisconnected()

    const expectedState = {
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle onMessageReceived action', () => {
    const feedData = {
      success: true,
      orders: [{ id: 1, name: 'Order 1' }],
      total: 100,
      totalToday: 10,
    }

    const action = feedOrdersWebSocketActions.onMessageReceived(feedData)
    const expectedState = {
      ...initialState,
      feed: feedData,
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle onError action', () => {
    const action = feedOrdersWebSocketActions.onError(new Event('error'))

    const expectedState = {
      ...initialState,
      error: 'Ошибка WebSocket',
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
