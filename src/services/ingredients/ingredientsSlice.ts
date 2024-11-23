import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../components/app/store/store'

import { StateSchema } from '../../components/app/store/types'

import { fetchIngredients } from './fetchIngredients'

import { Ingredients, IngredientsSchema } from './types'

// @ts-ignore
export const ingredientsAdapter = createEntityAdapter<Ingredients>({
  selectId: (ingredients: Ingredients) => ingredients._id,
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
    _inited: false,
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
      state.error = action.payload || 'Something went wrong'
    })
  },
})

export const { reducer: ingredientsReducer } = ingredientsSlice

export const { selectAll: selectAllIngredients, selectById: selectIngredientById } =
  ingredientsAdapter.getSelectors((state: RootState) => state.ingredients)
