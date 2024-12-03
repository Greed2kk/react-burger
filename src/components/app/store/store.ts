import { configureStore } from '@reduxjs/toolkit'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { rootReducers } from '../../../services' // StateSchema

const initialState = {}

export const store = configureStore({
  preloadedState: initialState,
  reducer: rootReducers,
  devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
