import { combineReducers } from '@reduxjs/toolkit'

import { burgerConstructorReducer } from './burger-constructor/burger-constructor-slice'
import { orderDetailsReducer } from './order-details/order-details-slice'

import { ingredientsReducer } from './ingredients/ingredient-slice'

export const rootReducers = combineReducers({
  ingredients: ingredientsReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
})
