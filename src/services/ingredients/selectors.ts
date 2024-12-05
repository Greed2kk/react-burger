import { createSelector, Selector } from '@reduxjs/toolkit'

import { type RootState } from '../../components/app/store/store'
import { type StateSchema } from '../../components/app/store/types'

import {
  selectAllIngredients,
  selectIngredientEntities,
  selectById,
} from './ingredient-slice'

import { Categories, Ingredient, IngredientType } from './types'

export const getIngredientsError = (state: StateSchema): string | undefined =>
  state.ingredients?.error

export const getIngredientQuantity = (_id: string) => (state: RootState) =>
  selectById(state, _id).qty

export const getIngredients = createSelector(
  selectAllIngredients,
  ingredients => {
    const categories: Categories = {
      [IngredientType.BUN]: [],
      [IngredientType.MAIN]: [],
      [IngredientType.SAUCE]: [],
    }

    ingredients.forEach(
      ingredient =>
        (categories[ingredient.type] = [
          ...categories[ingredient.type],
          ingredient._id,
        ]),
    )

    return categories
  },
)

export const getIngredientsByIds = (
  ids: string[],
): Selector<StateSchema, Ingredient[]> =>
  createSelector([selectIngredientEntities], (entities): Ingredient[] =>
    ids.map(id => entities[id]).filter(ingredient => ingredient !== undefined),
  )
