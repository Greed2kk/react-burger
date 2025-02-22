import { configureStore } from '@reduxjs/toolkit'

import { createOrder } from '@/services/order-details/create-order'

import burgerConstructorReducer, {
  addIngredient,
  initialState,
  removeIngredient,
  setIngredientsOrder,
} from './burger-constructor-slice'

describe('burgerConstructorSlice', () => {
  let store

  const ingredient = {
    id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
  }

  const secondIngredient = {
    id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  }

  const mainIngredient = {
    id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
  }

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
    const action = addIngredient(ingredient)
    const state = burgerConstructorReducer(initialState, action)

    expect(state.ids).toContain(ingredient.id)
    expect(state.entities[ingredient.id]).toEqual(ingredient)
  })

  it('should remove existing bun when adding a new bun', () => {
    store.dispatch(addIngredient(ingredient))

    store.dispatch(addIngredient(secondIngredient))

    const state = store.getState().burgerConstructor

    expect(state.ids).toEqual([secondIngredient.id])
    expect(state.entities[secondIngredient.id]).toEqual(secondIngredient)
    expect(state.entities[ingredient.id]).toBeUndefined()
  })

  it('should handle setIngredientsOrder', () => {
    store.dispatch(addIngredient(mainIngredient))
    store.dispatch(addIngredient(mainIngredient))

    const newOrder = [
      ingredient.id,
      mainIngredient.id,
      mainIngredient.id,
      ingredient.id,
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
