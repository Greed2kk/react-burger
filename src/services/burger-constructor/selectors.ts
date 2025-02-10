import { createSelector } from '@reduxjs/toolkit'

import { selectAllBurgerIngredients } from '@/services/burger-constructor/burger-constructor-slice'
import { IngredientType } from '@/services/ingredients/types'

import { getTotalPrice } from '@/utils/helpers/getTotalPrice'

export const selectBunId = createSelector(
  selectAllBurgerIngredients,
  ingredients =>
    ingredients.filter(ingredient => ingredient.type === IngredientType.BUN)[0]
      ?._id,
)
export const selectTotalPrice = createSelector(
  selectAllBurgerIngredients,
  ingredients => getTotalPrice(ingredients),
)

export const selectIngredientsIds = createSelector(
  selectAllBurgerIngredients,
  ingredients =>
    ingredients
      .filter(ingredient => ingredient.type !== IngredientType.BUN)
      .map(ingredient => ingredient?._id),
)

export const selectIngredients = createSelector(
  selectAllBurgerIngredients,
  ingredients =>
    ingredients.filter(ingredient => ingredient.type !== IngredientType.BUN),
)

export const selectBun = createSelector(
  selectAllBurgerIngredients,
  ingredients =>
    ingredients.filter(ingredient => ingredient.type === IngredientType.BUN)[0],
)
