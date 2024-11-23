import { EntityState } from '@reduxjs/toolkit'


export interface IngredientsSchema extends EntityState<Ingredients, string> {
  isLoading?: boolean
  error?: string
  _inited?: boolean
}

export enum IngredientType {
  BUN = 'bun',
  MAIN = 'main',
  SAUCE = 'sauce',
}

export interface Ingredients {
  _id: string
  name: string
  type: IngredientType
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}
