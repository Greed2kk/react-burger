import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '@/services/auth/auth-slice'
import burgerConstructorReducer from '@/services/burger-constructor/burger-constructor-slice'
import feedOrdersReducer from '@/services/feed-orders/feed-orders-slice'
import ingredientDetailsReducer from '@/services/ingredient-details/ingredient-details-slice'
import ingredientReducer from '@/services/ingredients/ingredient-slice'
import orderCompositionReducer from '@/services/order-composition/order-composition-slice'
import orderDetailsReducer from '@/services/order-details/order-details-slice'
import profileOrdersReducer from '@/services/profile-orders/profile-orders-slice'

export const rootReducers = combineReducers({
  ingredients: ingredientReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderComposition: orderCompositionReducer,
  auth: authReducer,
  feedOrders: feedOrdersReducer,
  profileOrders: profileOrdersReducer,
})
