import { configureStore } from '@reduxjs/toolkit'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { rootReducers } from '../../../services' // StateSchema

import { rtkApi } from '../../../services/rtk-api'

import { $api, CustomApi } from '../../../utils/api/api'

const initialState = {}

export interface ThunkExtraArgs<T, B = {}> {
  api: CustomApi<T, B>
}

const extraArgument: ThunkExtraArgs<any, any> = {
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

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
