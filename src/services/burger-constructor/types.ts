import { EntityState } from '@reduxjs/toolkit'

import { Ingredient } from '../ingredients/types'

import { burgerConstructorAdapter } from './burger-constructor-slice'

export interface BurgerIngredient {
  id: string
  _id: Ingredient['_id']
  price: Ingredient['price']
}

export interface BurgerConstructorSchema
  extends EntityState<BurgerIngredient, string> {
  bun: BurgerIngredient | null
  totalPrice: number
  ingredients: ReturnType<typeof burgerConstructorAdapter.getInitialState>
}
