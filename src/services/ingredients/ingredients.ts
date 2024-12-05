import { createSelector, Selector } from '@reduxjs/toolkit'

import { RootState } from '../../components/app/store/store'
import { StateSchema } from '../../components/app/store/types'

import {
  selectAllIngredients,
  selectIngredientEntities,
  selectById,
} from './ingredient-slice'

import { Categories, Ingredient, IngredientType } from './types'

export const getIngredientsIsLoading = (
  state: StateSchema,
): boolean | undefined => state.ingredients?.isLoading

export const getIngredientsError = (state: StateSchema): string | undefined =>
  state.ingredients?.error

export const selectIngredientById = (id: string) => (state: RootState) =>
  selectById(state, id)

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
): Selector<RootState, Ingredient[]> =>
  createSelector([selectIngredientEntities], (entities): Ingredient[] =>
    ids.map(id => entities[id]).filter(ingredient => ingredient !== undefined),
  )
