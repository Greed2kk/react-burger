import { createAsyncThunk } from '@reduxjs/toolkit'

import { ordersSlug } from '../../utils/api/constants'
import { api } from '../../utils/api/request'
import { clearIngredients } from '../burger-constructor/burger-constructor-slice'
import { clearQuantity } from '../ingredients/ingredient-slice'

import type { OrderResponse } from './types'

export const createOrder = createAsyncThunk<OrderResponse, { data: string[] }>(
  'orderDetails/createOrder',
  async ({ data }, { dispatch }) => {
    const resetOrderInfo = (): void => {
      dispatch(clearQuantity())
      dispatch(clearIngredients())
    }

    return await api
      .post(ordersSlug, {
        ingredients: data,
      },{}, resetOrderInfo)
      .then()
  },
)
