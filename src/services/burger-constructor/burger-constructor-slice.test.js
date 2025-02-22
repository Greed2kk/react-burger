import { configureStore } from '@reduxjs/toolkit'

import { createOrder } from '@/services/order-details/create-order'

import burgerConstructorReducer, {
  addIngredient,
  initialState,
  removeIngredient,
  setIngredientsOrder,
} from './burger-constructor-slice'

import { bun, mainIngredient,secondBun } from '@/__mocks__/ingredients'

describe('burgerConstructorSlice', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        burgerConstructor: burgerConstructorReducer,
      },
    })
  })

  it('should handle initial state', () => {
    const state = store.getState().burgerConstructor

    expect(state).toEqual(initialState)
  })

  it('should handle addIngredient', () => {
    const action = addIngredient(bun)
    const state = burgerConstructorReducer(initialState, action)

    expect(state.ids).toContain(bun.id)
    expect(state.entities[bun.id]).toEqual(bun)
  })

  it('should remove existing bun when adding a new bun', () => {
    store.dispatch(addIngredient(bun))

    store.dispatch(addIngredient(secondBun))

    const state = store.getState().burgerConstructor

    expect(state.ids).toEqual([secondBun.id])
    expect(state.entities[secondBun.id]).toEqual(secondBun)
    expect(state.entities[bun.id]).toBeUndefined()
  })

  it('should handle setIngredientsOrder', () => {
    store.dispatch(addIngredient(mainIngredient))
    store.dispatch(addIngredient(mainIngredient))

    const newOrder = [
      bun.id,
      mainIngredient.id,
      mainIngredient.id,
      bun.id,
    ]

    store.dispatch(setIngredientsOrder(newOrder))

    const state = store.getState().burgerConstructor

    expect(state.ids).toEqual(newOrder)
  })

  it('should handle removeIngredient', () => {
    store.dispatch(addIngredient(mainIngredient))
    store.dispatch(removeIngredient(mainIngredient.id))

    const state = store.getState().burgerConstructor

    expect(state.ids).toEqual([])
  })

  it('should reset state after createOrder.fulfilled', () => {
    store.dispatch(createOrder.fulfilled())

    const state = store.getState().burgerConstructor

    expect(state).toEqual(initialState)
  })
})
