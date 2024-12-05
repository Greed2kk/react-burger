import type { Ingredient } from '../ingredients/types'

import type { IngredientDetailsSchema } from './types'

export const getIngredientData = (state: {
  ingredientDetails: IngredientDetailsSchema
}): Ingredient => state.ingredientDetails.ingredientDetails
