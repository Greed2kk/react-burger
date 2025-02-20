import { createAction } from '@reduxjs/toolkit'

import { Feed } from '@/services/feed-orders/types'
import { WebSocketActions } from '@/services/middleware/socket-midleware'


export const profileOrdersWebSocketActions: WebSocketActions<Feed> = {
  connect: createAction<string>('profileOrders/wsConnect'),
  disconnect: createAction<void>('profileOrders/wsDisconnect'),
  sendMessage: createAction<Feed>('profileOrders/wsSendMessage'),
  onConnected: createAction<Event>('profileOrders/wsConnected'),
  onDisconnected: createAction<CloseEvent>('profileOrders/wsDisconnected'),
  onMessageReceived: createAction<Feed>('profileOrders/wsMessageReceived'),
  onError: createAction<Event>('profileOrders/wsError'),
}
