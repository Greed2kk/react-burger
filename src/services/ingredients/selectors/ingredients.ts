import { StateSchema } from '../../../components/app/store/types'

export const getIngredientsIsLoading = (state: StateSchema): boolean | undefined =>
  state.ingredients?.isLoading

export const getIngredientsError = (state: StateSchema): string | undefined =>
  state.ingredients?.error
