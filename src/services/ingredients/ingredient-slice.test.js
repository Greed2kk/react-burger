import { fetchIngredients } from '@/services/ingredients/fetch-ingredients'

import ingredientReducer, {
  ingredientsAdapter,
  selectAllIngredients,
} from './ingredient-slice'

describe('ingredientSlice', () => {
  const initialState = ingredientsAdapter.getInitialState({
    isLoading: false,
    ids: [],
    entities: {},
    error: '',
  })

  const mockIngredients = [
    {
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
  ]

  it('should return the initial state', () => {
    expect(ingredientReducer(undefined, { type: undefined })).toEqual(
      initialState,
    )
  })

  it('should set isLoading to true when fetchIngredients.pending is dispatched', () => {
    const action = { type: fetchIngredients.pending.type }
    const state = ingredientReducer(initialState, action)

    expect(state.isLoading).toBe(true)
    expect(state.error).toBeUndefined()
  })

  it('should populate ingredients when fetchIngredients.fulfilled is dispatched', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: { data: mockIngredients },
    }
    const state = ingredientReducer(initialState, action)

    expect(state.isLoading).toBe(false)
    expect(state.error).toBe('')
    expect(selectAllIngredients({ ingredients: state })).toEqual(
      mockIngredients,
    )
  })

  it('should handle fetchIngredients.rejected and set an error message', () => {
    const action = { type: fetchIngredients.rejected.type }
    const state = ingredientReducer(initialState, action)

    expect(state.isLoading).toBe(false)
    expect(state.error).toBe('Something went wrong')
  })
})
