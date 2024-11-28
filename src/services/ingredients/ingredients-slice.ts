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
  selectId: (ingredients: Ingredient) => ingredients._id,
})

const initialState = ingredientsAdapter.getInitialState<IngredientsSchema>({
  isLoading: false,
  ids: [],
  entities: {},
  error: '',
})

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    increaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
      const ingredient = state.entities[action.payload._id]

      if (!ingredient.qty) {
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
    builder.addCase(fetchIngredients.pending, state => {
      state.error = undefined

      state.isLoading = true
    })

    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoading = false

      ingredientsAdapter.setAll(state, action.payload.data)
    })
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload !== 'signal is aborted without reason') {
        state.error = action.payload || 'Something went wrong'
      }
    })
  },
})

export const { reducer: ingredientsReducer, actions: ingredientsActions } =
  ingredientsSlice

export const { increaseQuantity, decreaseQuantity, clearQuantity } =
  ingredientsActions

export const {
  selectAll: selectAllIngredients,
  selectById: selectIngredientById,
} = ingredientsAdapter.getSelectors((state: RootState) => state.ingredients)
