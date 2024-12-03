import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../components/app/store/store'
import { ingredientsAdapter } from '../ingredients/ingredient-slice'
import { IngredientType } from '../ingredients/types'

import { BurgerConstructorSchema, BurgerIngredient } from './types'

export const burgerConstructorAdapter = createEntityAdapter({
  selectId: (burgerIngredient: BurgerIngredient) => burgerIngredient.id,
})

export const initialState =
  ingredientsAdapter.getInitialState<BurgerConstructorSchema>({
    ids: [],
    entities: {},
    totalPrice: 0,
  })

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, { payload }) => {
      const allIIngredients = burgerConstructorAdapter
        .getSelectors()
        .selectAll(state)

      const existingBun = allIIngredients.find(
        ingredient => ingredient.type === IngredientType.BUN,
      )

      if (existingBun && payload.type === IngredientType.BUN) {
        ingredientsAdapter.removeOne(state, existingBun.id)
      }

      burgerConstructorAdapter.addOne(state, payload)
    },
    setIngredientsOrder: (state, { payload }) => {
      state.ids = payload
    },
    removeIngredient: burgerConstructorAdapter.removeOne,
    clearIngredients: () => initialState,
  },
})

export const { reducer: burgerConstructorReducer, selectors } =
  burgerConstructorSlice

export const {
  addIngredient,
  removeIngredient,
  clearIngredients,
  setIngredientsOrder,
} = burgerConstructorSlice.actions

export const { selectAll: selectAllBurgerIngredients } =
  burgerConstructorAdapter.getSelectors(
    (state: RootState) => state.burgerConstructor,
  )
