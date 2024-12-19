import { createSelector, Selector } from '@reduxjs/toolkit'

import { type StateSchema } from '@/components/app/store/types'

import {
  Categories,
  Ingredient,
  IngredientType,
} from './types'

import {
  selectAllIngredients,
  selectIngredientById,
  selectIngredientEntities,
} from './ingredient-slice'

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

export const createAppSelector = createSelector.withTypes<StateSchema>()

export const getIngredientsById = (id: string): Selector<StateSchema, Ingredient>  =>
  createAppSelector(
    (state: StateSchema) => state,
    ingredientsState => selectIngredientById(ingredientsState, id),
  )
