import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'

import { StateSchema } from '../../components/app/store/types'

import { fetchIngredients } from './fetch-ingredients'

import { Ingredient, IngredientsSchema } from './types'

export const ingredientsAdapter = createEntityAdapter<Ingredient, string>({
  selectId: (ingredient: Ingredient) => ingredient._id,
})

const initialState = ingredientsAdapter.getInitialState<IngredientsSchema>({
  isLoading: false,
  ids: [],
  entities: {},
  error: '',
})

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.error = undefined

        state.isLoading = true
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false

        ingredientsAdapter.setAll(state, action.payload.data)
      })
      .addCase(fetchIngredients.rejected, state => {
        state.isLoading = false
        state.error = 'Something went wrong'
      })
  },
})

const { reducer: ingredientReducer } = ingredientSlice

export const {
  selectAll: selectAllIngredients,
  selectById,
  selectEntities: selectIngredientEntities,
} = ingredientsAdapter.getSelectors((state: StateSchema) => state.ingredients)

export default ingredientReducer
