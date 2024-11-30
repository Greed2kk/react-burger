import { createSelector } from '@reduxjs/toolkit'

import { IngredientType } from '../../ingredients/types'

import { selectAllBurgerIngredients } from '../burger-constructor-slice'

export const selectBunId = createSelector(
  selectAllBurgerIngredients,
  ingredients =>
    ingredients.filter(ingredient => ingredient.type === IngredientType.BUN)[0]
      ?._id,
)

export const selectTotalPrice = createSelector(
  selectAllBurgerIngredients,
  ingredients =>
    ingredients.reduce((prev, cur) => {
      if (cur.type === IngredientType.BUN) {
        return prev + cur.price * 2
      }

      return prev + cur.price
    }, 0),
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
