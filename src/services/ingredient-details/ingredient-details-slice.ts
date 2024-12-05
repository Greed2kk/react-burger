import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Ingredient, IngredientType } from '../ingredients/types'

import { type IngredientDetailsState } from './types'

const initialState: IngredientDetailsState = {
  ingredientDetails: {
    _id: '',
    name: '',
    type: IngredientType.BUN,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
  },
}

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    addIngredientData: (state, { payload }: PayloadAction<Ingredient>) => {
      state.ingredientDetails = payload
    },
    clearIngredientData: state => {
      state.ingredientDetails = initialState.ingredientDetails
    },
  },
})

export const getIngredientData = (state: {
  ingredientDetails: IngredientDetailsState
}): Ingredient => state.ingredientDetails.ingredientDetails

const { reducer: ingredientDetailsReducer, actions } = ingredientDetailsSlice

export const { addIngredientData, clearIngredientData } = actions

export default ingredientDetailsReducer
