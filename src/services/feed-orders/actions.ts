import { createAction } from '@reduxjs/toolkit'

import { WebSocketActions } from '@/services/middleware/socket-midleware'

import { Feed } from './types'

export const feedOrdersWebSocketActions: WebSocketActions<Feed> = {
  connect: createAction<string>('feedOrders/wsConnect'),
  disconnect: createAction<void>('feedOrders/wsDisconnect'),
  sendMessage: createAction<Feed>('feedOrders/wsSendMessage'),
  onConnected: createAction<Event>('feedOrders/wsConnected'),
  onDisconnected: createAction<CloseEvent>('feedOrders/wsDisconnected'),
  onMessageReceived: createAction<Feed>('feedOrders/wsMessageReceived'),
  onError: createAction<Event>('feedOrders/wsError'),
}
