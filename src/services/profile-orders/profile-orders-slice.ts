import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { feedOrdersWebSocketActions } from '@/services/feed-orders/actions'
import { Feed } from '@/services/feed-orders/types'
import { WebsocketStatus } from '@/services/middleware/socket-midleware'

import { ProfileOrdersSchema } from './types'

import { profileOrdersWebSocketActions } from './actions'

const initialState: ProfileOrdersSchema = {
  status: WebsocketStatus.OFFLINE,
  feed: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: null,
}

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(profileOrdersWebSocketActions.onConnected, state => {
        state.status = WebsocketStatus.OFFLINE
        state.error = null
      })
      .addCase(profileOrdersWebSocketActions.onDisconnected, state => {
        state.status = WebsocketStatus.ONLINE
      })
      .addCase(
        profileOrdersWebSocketActions.onMessageReceived,
        (state, action: PayloadAction<Feed>) => {
          state.feed = action.payload
        },
      )
      .addCase(
        feedOrdersWebSocketActions.onError,
        (state, _action: PayloadAction<Event>) => {
          state.error = 'Ошибка WebSocket'
        },
      )
  },
})

const { reducer: profileOrdersReducer } = profileOrdersSlice

export default profileOrdersReducer
