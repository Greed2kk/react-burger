import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { StateSchema } from '@/components/app/store/types'

import {
  BurgerConstructorSchema,
  BurgerIngredient,
} from '@/services/burger-constructor/types'
import { ingredientsAdapter } from '@/services/ingredients/ingredient-slice'
import { IngredientType } from '@/services/ingredients/types'
import { createOrder } from '@/services/order-details/create-order'

export const burgerConstructorAdapter = createEntityAdapter({
  selectId: (burgerIngredient: BurgerIngredient) => burgerIngredient.id,
})

export const initialState =
  ingredientsAdapter.getInitialState<BurgerConstructorSchema>({
    ids: [],
    entities: {},
    totalPrice: 0,
  })

const burgerConstructorSlice = createSlice({
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
  },
  extraReducers: builder =>
    builder.addCase(createOrder.fulfilled, state => {
      Object.assign(state, initialState)
    }),
})

const { reducer: burgerConstructorReducer, actions } = burgerConstructorSlice

export const { addIngredient, removeIngredient, setIngredientsOrder } = actions

export const { selectAll: selectAllBurgerIngredients } =
  burgerConstructorAdapter.getSelectors(
    (state: StateSchema) => state.burgerConstructor,
  )

export default burgerConstructorReducer
