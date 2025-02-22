import { feedOrdersWebSocketActions } from '@/services/feed-orders/actions'
import { WebsocketStatus } from '@/services/middleware/socket-midleware'

import { profileOrdersWebSocketActions } from './actions'
import profileOrdersReducer, { initialState } from './profile-orders-slice'

import { mockFeed } from '@/__mocks__/feed'

describe('profileOrdersSlice', () => {
  it('should return the initial state', () => {
    expect(profileOrdersReducer(undefined, { type: undefined })).toEqual(
      initialState,
    )
  })

  it('should handle onConnected', () => {
    const action = { type: profileOrdersWebSocketActions.onConnected.type }
    const state = profileOrdersReducer(initialState, action)

    expect(state.status).toBe(WebsocketStatus.ONLINE)
    expect(state.error).toBeNull()
  })

  it('should handle onDisconnected', () => {
    const action = { type: profileOrdersWebSocketActions.onDisconnected.type }
    const state = profileOrdersReducer(
      { ...initialState, status: WebsocketStatus.ONLINE },
      action,
    )

    expect(state.status).toBe(WebsocketStatus.OFFLINE)
  })

  it('should handle onMessageReceived', () => {
    const action = {
      type: profileOrdersWebSocketActions.onMessageReceived.type,
      payload: mockFeed,
    }
    const state = profileOrdersReducer(initialState, action)

    expect(state.feed).toEqual(mockFeed)
  })

  it('should handle onError', () => {
    const action = { type: feedOrdersWebSocketActions.onError.type }
    const state = profileOrdersReducer(initialState, action)

    expect(state.error).toBe('Ошибка WebSocket')
  })
})
