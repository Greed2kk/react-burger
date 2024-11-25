import { combineReducers } from '@reduxjs/toolkit'

import { burgerConstructorReducer } from './burger-constructor/burger-constructor-slice'

import { rtkApi } from './rtk-api'

import { ingredientsReducer } from './ingredients/ingredients-slice'

export const rootReducers = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  [rtkApi.reducerPath]: rtkApi.reducer,
})
