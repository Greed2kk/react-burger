import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'

import { feedOrdersWebSocketActions } from '@/services/feed-orders/actions'
import { createWebSocketMiddleware } from '@/services/middleware/socket-midleware'
import { profileOrdersWebSocketActions } from '@/services/profile-orders/actions'
import { rootReducers } from '@/services/root-reducer'

const wsFeedOrders = createWebSocketMiddleware(feedOrdersWebSocketActions, {
  withTokenRefresh: false,
})

const wsProfileOrders = createWebSocketMiddleware(
  profileOrdersWebSocketActions,
  {
    withTokenRefresh: true,
  },
)

export const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(wsFeedOrders)
      .concat(wsProfileOrders ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
