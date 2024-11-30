import { Ingredient, IngredientType } from '../../services/ingredients/types'

export const isBun = (ingredient: Ingredient): boolean =>
  ingredient?.type === IngredientType.BUN
