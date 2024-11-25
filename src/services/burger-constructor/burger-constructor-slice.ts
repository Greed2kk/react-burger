import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../components/app/store/store'

import { BurgerConstructorSchema, BurgerIngredient } from './types'

export const burgerConstructorAdapter = createEntityAdapter({
  selectId: (burgerIngredient: BurgerIngredient) => burgerIngredient.id,
})

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState:
    burgerConstructorAdapter.getInitialState<BurgerConstructorSchema>({
      ids: [],
      entities: {},
    }),
  reducers: {
    addIngredient: burgerConstructorAdapter.addOne,
    removeIngredient: burgerConstructorAdapter.removeOne,
    clearIngredients: () => burgerConstructorAdapter.getInitialState(),
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
