import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkExtraArgs } from '../../components/app/store/store'

import { ingredientsSlug } from '../../utils/api/constants'

import { Ingredients } from './types'

// @ts-ignore
export const fetchIngredients = createAsyncThunk<
  Ingredients[],
  { signal: AbortSignal },
  { rejectValue: string; extra: ThunkExtraArgs<Ingredients[]> }
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
