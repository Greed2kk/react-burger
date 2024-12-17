import type { IngredientDetailsSchema } from '@/services/ingredient-details/types'
import type { Ingredient } from '@/services/ingredients/types'

export const getIngredientData = (state: {
  ingredientDetails: IngredientDetailsSchema
}): Ingredient => state.ingredientDetails.ingredientDetails
