import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { WebsocketStatus } from '@/services/middleware/socket-midleware'

import { Feed, FeedOrdersSchema } from './types'

import { feedOrdersWebSocketActions } from './actions'

export const initialState: FeedOrdersSchema = {
  status: WebsocketStatus.OFFLINE,
  feed: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: null,
}

export const feedOrdersSlice = createSlice({
  name: 'feedOrders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(feedOrdersWebSocketActions.onConnected, state => {
        state.status = WebsocketStatus.ONLINE
        state.error = null
      })
      .addCase(feedOrdersWebSocketActions.onDisconnected, state => {
        state.status = WebsocketStatus.OFFLINE
      })
      .addCase(
        feedOrdersWebSocketActions.onMessageReceived,
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

const { reducer: feedOrdersReducer } = feedOrdersSlice

export default feedOrdersReducer
