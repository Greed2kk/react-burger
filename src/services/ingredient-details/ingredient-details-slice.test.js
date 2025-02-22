import ingredientDetailsReducer, {
  addIngredientData,
  clearIngredientData,
  initialState,
} from './ingredient-details-slice'

import { bun } from '@/__mocks__/ingredients'

describe('ingredientDetailsSlice', () => {
  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, { type: undefined })).toEqual(
      initialState,
    )
  })

  it('should handle addIngredientData', () => {
    const action = addIngredientData(bun)
    const state = ingredientDetailsReducer(initialState, action)

    expect(state.ingredientDetails).toEqual(bun)
  })

  it('should handle clearIngredientData', () => {
    const populatedState = { ingredientDetails: bun }
    const action = clearIngredientData()
    const state = ingredientDetailsReducer(populatedState, action)

    expect(state).toEqual(initialState)
  })
})
