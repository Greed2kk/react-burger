import { createSelector, Selector } from '@reduxjs/toolkit'

import {
  selectAllIngredients,
  selectIngredientEntities,
} from '@/services/ingredients/ingredient-slice'

import { type StateSchema } from '@/components/app/store/types'
import {
  Categories,
  Ingredient,
  IngredientType,
} from '@/services/ingredients/types'

export const getIngredientsError = (state: StateSchema): string | undefined =>
  state.ingredients?.error

export const getIngredientsIsLoading = (state: StateSchema): boolean =>
  state.ingredients.isLoading

export const getIngredients = createSelector(
  selectAllIngredients,
  ingredients => {
    const filterIngredients = (
      filterType: IngredientType,
    ): Ingredient['_id'][] =>
      ingredients
        .filter(({ type }) => type === filterType)
        .map(({ _id }) => _id)

    const categories: Categories = {
      [IngredientType.BUN]: filterIngredients(IngredientType.BUN),
      [IngredientType.MAIN]: filterIngredients(IngredientType.MAIN),
      [IngredientType.SAUCE]: filterIngredients(IngredientType.SAUCE),
    }

    return categories
  },
)

export const getIngredientsByIds = (
  ids: string[],
): Selector<StateSchema, Ingredient[]> =>
  createSelector([selectIngredientEntities], (entities): Ingredient[] =>
    ids.map(id => entities[id]).filter(ingredient => ingredient !== undefined),
  )
