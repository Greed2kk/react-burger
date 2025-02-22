import { fetchIngredients } from '@/services/ingredients/fetch-ingredients'

import ingredientReducer, {
  initialState,
  selectAllIngredients,
} from './ingredient-slice'

import { bun } from '@/__mocks__/ingredients'

describe('ingredientSlice', () => {

  const mockIngredients = [bun]

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
