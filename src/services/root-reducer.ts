import { combineReducers } from '@reduxjs/toolkit'

import { burgerConstructorReducer } from './burger-constructor/burger-constructor-slice'
import { orderDetailsReducer } from './order-details/order-details-slice'

import { rtkApi } from './rtk-api'

import { ingredientsReducer } from './ingredients/ingredients-slice'

export const rootReducers = combineReducers({
  ingredients: ingredientsReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  [rtkApi.reducerPath]: rtkApi.reducer,
})
