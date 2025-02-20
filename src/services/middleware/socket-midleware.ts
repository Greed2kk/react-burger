import {
  type ActionCreatorWithoutPayload,
  type ActionCreatorWithPayload,
  type Middleware,
} from '@reduxjs/toolkit'

import { refreshAccessToken } from '@/utils/api/request'

export enum WebsocketStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export type WebSocketActions<TMessage> = {
  connect: ActionCreatorWithPayload<string>
  disconnect: ActionCreatorWithoutPayload
  sendMessage: ActionCreatorWithPayload<TMessage>
  onConnected: ActionCreatorWithPayload<Event>
  onDisconnected: ActionCreatorWithPayload<CloseEvent>
  onMessageReceived: ActionCreatorWithPayload<TMessage>
  onError: ActionCreatorWithPayload<Event>
}

type WebSocketOptions = {
  withTokenRefresh: boolean
}

export function createWebSocketMiddleware<TMessage>(
  actions: WebSocketActions<TMessage>,
  options: WebSocketOptions,
): Middleware {
  let socket: WebSocket | null = null
  let isConnected = false
  let reconnectTimer = 0
  let url: string

  return store => next => action => {
    const {
      connect,
      disconnect,
      sendMessage,
      onConnected,
      onDisconnected,
      onMessageReceived,
      onError,
    } = actions
    const { withTokenRefresh } = options

    if (connect.match(action)) {
      if (socket !== null) {
        console.warn('WebSocket is already connected.')

        return next(action)
      }

      url = action.payload

      socket = new WebSocket(url)
      isConnected = true

      socket.onopen = event => {
        store.dispatch(onConnected(event))
      }

      socket.onclose = event => {
        store.dispatch(onDisconnected(event))
        socket = null

        if (isConnected) {
          reconnectTimer = window.setTimeout(() => {
            store.dispatch(connect(url))
          }, 3000)
        }
      }

      socket.onmessage = event => {
        const data = JSON.parse(event.data)

        store.dispatch(onMessageReceived(data))

        if (withTokenRefresh && data.message === 'Invalid or missing token') {
          refreshAccessToken().then(refreshData => {
            const wssUrl = new URL(url)

            wssUrl.searchParams.set('token', refreshData.replace('Bearer ', ''))
            store.dispatch(connect(wssUrl.toString()))
          })

          store.dispatch(disconnect())
        }
      }

      socket.onerror = event => {
        store.dispatch(onError(event))
      }

      return next(action)
    }

    if (disconnect.match(action)) {
      if (socket !== null) {
        socket.close()
      }

      clearTimeout(reconnectTimer)
      isConnected = false
      reconnectTimer = 0
      socket = null

      return next(action)
    }

    if (sendMessage.match(action)) {
      if (socket !== null && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(action.payload))
      } else {
        console.warn('WebSocket is not open. Cannot send message.')
      }

      return next(action)
    }

    return next(action)
  }
}
