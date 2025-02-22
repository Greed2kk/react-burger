import { IngredientType } from '@/services/ingredients/types'

import ingredientDetailsReducer, {
  addIngredientData,
  clearIngredientData,
} from './ingredient-details-slice'

describe('ingredientDetailsSlice', () => {
  const initialState = {
    ingredientDetails: {
      _id: '',
      name: '',
      type: IngredientType.BUN,
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_mobile: '',
      image_large: '',
      __v: 0,
    },
  }

  const mockIngredient = {
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

  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, { type: undefined })).toEqual(
      initialState,
    )
  })

  it('should handle addIngredientData', () => {
    const action = addIngredientData(mockIngredient)
    const state = ingredientDetailsReducer(initialState, action)

    expect(state.ingredientDetails).toEqual(mockIngredient)
  })

  it('should handle clearIngredientData', () => {
    const populatedState = { ingredientDetails: mockIngredient }
    const action = clearIngredientData()
    const state = ingredientDetailsReducer(populatedState, action)

    expect(state).toEqual(initialState)
  })
})
