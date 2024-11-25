import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../components/app/store/store'

import { StateSchema } from '../../components/app/store/types'

import { fetchIngredients } from './fetch-ingredients'

import { Ingredient, IngredientsSchema } from './types'

// @ts-ignore
export const ingredientsAdapter = createEntityAdapter<Ingredient>({
  selectId: (ingredients: Ingredient) => ingredients._id,
})

export const getIngredients = ingredientsAdapter.getSelectors<StateSchema>(
  state =>
    state.ingredients ||
    ingredientsAdapter.getInitialState({ isLoading: true }),
)

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
