import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkExtraArgs } from '../../components/app/store/store'

import { ingredientsSlug } from '../../utils/api/constants'

import { IngredientResponse } from './types'

// @ts-ignore
export const fetchIngredients = createAsyncThunk<
  IngredientResponse,
  { signal: AbortSignal },
  { rejectValue: string; extra: ThunkExtraArgs<IngredientResponse> }
>(
  'ingredients/fetchIngredients',
  async ({ signal }, { rejectWithValue, extra }) => {
    try {
      return await extra.api.get(ingredientsSlug, { signal })
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        return rejectWithValue('Request was aborted')
      }

      return rejectWithValue(error.message)
    }
  },
)
