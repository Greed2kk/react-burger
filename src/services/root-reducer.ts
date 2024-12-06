import { combineReducers } from '@reduxjs/toolkit'

import burgerConstructorReducer from './burger-constructor/burger-constructor-slice'
import ingredientDetailsReducer from './ingredient-details/ingredient-details-slice'
import  orderDetailsReducer  from './order-details/order-details-slice'
import  ingredientReducer  from './ingredients/ingredient-slice'

export const rootReducers = combineReducers({
  ingredients: ingredientReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
})
