import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'

import { RootState } from '../../components/app/store/store'
import { ingredientsAdapter } from '../ingredients/ingredients-slice'

import { BurgerConstructorSchema, BurgerIngredient } from './types'

export const burgerConstructorAdapter = createEntityAdapter({
  selectId: (burgerIngredient: BurgerIngredient) => burgerIngredient.id,
})

export const initialState =
  ingredientsAdapter.getInitialState<BurgerConstructorSchema>({
    ids: [],
    entities: {},
  })

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: burgerConstructorAdapter.addOne,
    removeIngredient: burgerConstructorAdapter.removeOne,
    clearIngredients: () => initialState,
  },
})

export const { reducer: burgerConstructorReducer, selectors } =
  burgerConstructorSlice

export const { addIngredient, removeIngredient, clearIngredients } =
  burgerConstructorSlice.actions

export const { selectAll: selectAllBurgerIngredients } =
  burgerConstructorAdapter.getSelectors(
    (state: RootState) => state.burgerConstructor,
  )
