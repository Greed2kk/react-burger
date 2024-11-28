import { createSelector } from '@reduxjs/toolkit'
import { IngredientType } from '../../ingredients/types'

import {
  burgerConstructorAdapter,
  initialState,
} from '../burger-constructor-slice'

const selectAllIngredients = burgerConstructorAdapter.getSelectors(
  (state: { burgerConstructor: typeof initialState }) =>
    state.burgerConstructor,
).selectAll

export const selectBun = createSelector(
  selectAllIngredients,
  ingredients =>
    ingredients.filter(ingredient => ingredient.type === IngredientType.BUN)[0],
)

export const selectIngredients = createSelector(
  selectAllIngredients,
  ingredients =>
    ingredients.filter(ingredient => ingredient.type !== IngredientType.BUN),
)
