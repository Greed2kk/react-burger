import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import { RootState } from '../../components/app/store/store'

import { isBun } from '../../utils/helpers/isBun'

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
  reducers: {
    increaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const ingredient = state.entities[action.payload._id]

      if (!ingredient?.qty) {
        if (isBun(ingredient)) {
          ingredient.qty = 2
        } else {
          ingredient.qty = 1
        }
      } else {
        if (!isBun(ingredient)) {
          ingredient.qty += 1
        }
      }
    },
    decreaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const ingredient = state.entities[action.payload._id]

      if (isBun(ingredient)) {
        ingredient.qty = 0
      }

      if (ingredient.qty) {
        ingredient.qty -= 1
      }
    },
    clearQuantity: state => {
      Object.values(state.entities).forEach(ingredient => {
        if (ingredient) {
          ingredient.qty = 0
        }
      })
    },
  },
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

const { reducer: ingredientReducer, actions } = ingredientSlice

export const { increaseQuantity, decreaseQuantity, clearQuantity } = actions

export const {
  selectAll: selectAllIngredients,
  selectById,
  selectEntities: selectIngredientEntities,
} = ingredientsAdapter.getSelectors((state: RootState) => state.ingredients)

export default ingredientReducer
