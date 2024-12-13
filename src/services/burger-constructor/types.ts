import { EntityState } from '@reduxjs/toolkit'

import { Ingredient } from '@/services/ingredients/types'

export interface BurgerIngredient {
  id: string
  _id: Ingredient['_id']
  price: Ingredient['price']
  type: Ingredient['type']
  imageMobile: Ingredient['image_mobile']
  name: Ingredient['name']
}

export interface BurgerConstructorSchema
  extends EntityState<BurgerIngredient, string> {
  totalPrice: number
}
