import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseApiUrl, ordersSlug } from '../../utils/api/constants'

import { clearIngredients } from '../burger-constructor/burger-constructor-slice'
import { clearQuantity } from '../ingredients/ingredient-slice'

import type { OrderResponse } from './types'

export const createOrder = createAsyncThunk<OrderResponse, { data: string[] }>(
  'orderDetails/createOrder',
  async ({ data }, { dispatch }) => {
    const response = await fetch(`${baseApiUrl}/${ordersSlug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: data }),
    })

    if (response.ok) {
      dispatch(clearQuantity())
      dispatch(clearIngredients())
    } else {
      const error = await response.json()

      throw new Error(error.message || 'Server Error')
    }

    return response.json()
  },
)
