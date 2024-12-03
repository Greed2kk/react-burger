import { createAsyncThunk } from '@reduxjs/toolkit'

import { baseApiUrl, ingredientsSlug } from '../../utils/api/constants'

import { IngredientResponse } from './types'

export const fetchIngredients = createAsyncThunk<IngredientResponse>(
  'ingredients/fetchIngredients',
  async () => {
    const resp = await fetch(`${baseApiUrl}/${ingredientsSlug}`)

    return resp.json()
  },
)
