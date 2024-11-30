import { RootState } from '../../../components/app/store/store'
import { StateSchema } from '../../../components/app/store/types'

import { selectIngredientById } from '../ingredients-slice'

export const getIngredientsIsLoading = (
  state: StateSchema,
): boolean | undefined => state.ingredients?.isLoading

export const getIngredientsError = (state: StateSchema): string | undefined =>
  state.ingredients?.error

export const makeSelectIngredientById = (id: string) => (state: RootState) =>
  selectIngredientById(state, id)

export const getIngredientQuantity = (_id: string) => (state: RootState) =>
  selectIngredientById(state, _id).qty

export const getIngredientName = (_id: string) => (state: RootState) =>
  selectIngredientById(state, _id).name

export const getIngredientImageMobile = (_id: string) => (state: RootState) =>
  selectIngredientById(state, _id).image_mobile
