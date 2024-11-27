import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../components/app/store/store'
import { ingredientsAdapter } from '../ingredients/ingredients-slice'

import { BurgerConstructorSchema, BurgerIngredient } from './types'

export const burgerConstructorAdapter = createEntityAdapter({
  selectId: (burgerIngredient: BurgerIngredient) => burgerIngredient.id,
})

const initialState =
  ingredientsAdapter.getInitialState<BurgerConstructorSchema>({
    ids: [],
    entities: {},
    bun: null,
    totalPrice: 0,
    ingredients: burgerConstructorAdapter.getInitialState(),
  })

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addIngredient: burgerConstructorAdapter.addOne,
    removeIngredient: burgerConstructorAdapter.removeOne,
    clearIngredients: () => initialState,
  },
})

export const { reducer: burgerConstructorReducer } = burgerConstructorSlice

export const { addIngredient, removeIngredient, clearIngredients } =
  burgerConstructorSlice.actions

export const {
  selectAll: selectAllBurgerIngredients,
  selectById: selectBurgerIngredientsById,
} = burgerConstructorAdapter.getSelectors(
  (state: RootState) => state.burgerConstructor,
)
