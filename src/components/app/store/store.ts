import { configureStore } from '@reduxjs/toolkit'

import { rootReducers } from '../../../services' // StateSchema

import { rtkApi } from '../../../services/rtkApi'

import { $api, CustomApi } from '../../../utils/api/api'

const initialState = {}

export interface ThunkExtraArgs<T> {
  api: CustomApi<T>
}

const extraArgument: ThunkExtraArgs<any> = {
  api: $api,
}

export const store = configureStore({
  preloadedState: initialState,
  reducer: rootReducers,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat(rtkApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
