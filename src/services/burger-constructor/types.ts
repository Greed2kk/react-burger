import { EntityState } from '@reduxjs/toolkit'

import { Ingredient } from '../ingredients/types'

export interface BurgerIngredient {
  id: string
  _id: Ingredient['_id']
  isBun: boolean
}

export interface BurgerConstructorSchema
  extends EntityState<BurgerIngredient, string> {}
