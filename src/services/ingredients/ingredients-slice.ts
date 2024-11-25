import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../components/app/store/store'

import { fetchIngredients } from './fetch-ingredients'

import { Ingredient, IngredientsSchema } from './types'

export const ingredientsAdapter = createEntityAdapter({
  selectId: (ingredients: Ingredient) => ingredients._id,
})

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsAdapter.getInitialState<IngredientsSchema>({
    isLoading: false,
    ids: [],
    entities: {},
    error: '',
  }),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchIngredients.pending, state => {
      state.error = undefined

      state.isLoading = true
    })

    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoading = false

      ingredientsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload !== 'signal is aborted without reason') {
        state.error = action.payload || 'Something went wrong'
      }
    })
  },
})

export const { reducer: ingredientsReducer } = ingredientsSlice

export const {
  selectAll: selectAllIngredients,
  selectById: selectIngredientById,
} = ingredientsAdapter.getSelectors((state: RootState) => state.ingredients)
