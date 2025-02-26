import { EntityState } from '@reduxjs/toolkit'

export interface IngredientsSchema extends EntityState<Ingredient, string> {
  isLoading: boolean
  error?: string
}

export enum IngredientType {
  BUN = 'bun',
  SAUCE = 'sauce',
  MAIN = 'main',
}

export interface IngredientResponse {
  data: Ingredient[]
}

export interface Ingredient {
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

export interface Categories {
  [IngredientType.BUN]: Ingredient['_id'][]
  [IngredientType.SAUCE]: Ingredient['_id'][]
  [IngredientType.MAIN]: Ingredient['_id'][]
}
