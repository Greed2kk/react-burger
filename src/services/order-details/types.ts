import { SerializedError } from '@reduxjs/toolkit'

import { Ingredient } from '../ingredients/types'

export interface OrderDetailsSchema extends OrderDetails {
  isLoading?: boolean
  error?: string | SerializedError
}

export interface OrderDetails {
  name?: string
  order?: {
    number?: number
  }
  success?: boolean
}

export interface IngredientsData {
  ingredients: Ingredient['_id'][]
}
