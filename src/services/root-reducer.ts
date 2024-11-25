import { combineReducers } from '@reduxjs/toolkit'

import { rtkApi } from './rtk-api'

import { ingredientsReducer } from './ingredients/ingredients-slice'

export const rootReducers = combineReducers({
  ingredients: ingredientsReducer,
  [rtkApi.reducerPath]: rtkApi.reducer,
})
