import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '@/services/auth/auth-slice'
import burgerConstructorReducer from '@/services/burger-constructor/burger-constructor-slice'
import ingredientDetailsReducer from '@/services/ingredient-details/ingredient-details-slice'
import ingredientReducer from '@/services/ingredients/ingredient-slice'
import orderDetailsReducer from '@/services/order-details/order-details-slice'

export const rootReducers = combineReducers({
  ingredients: ingredientReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  auth: authReducer,
})
