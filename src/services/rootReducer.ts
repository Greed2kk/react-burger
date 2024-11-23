import { combineReducers } from '@reduxjs/toolkit'

import { rtkApi } from './rtkApi'

import { ingredientsReducer } from './ingredients/ingredientsSlice'

export const rootReducers = combineReducers({
  ingredients: ingredientsReducer,
  [rtkApi.reducerPath]: rtkApi.reducer,
})
