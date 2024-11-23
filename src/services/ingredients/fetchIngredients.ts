import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkExtraArgs } from '../../components/app/store/store'

import { ingredientsSlug } from '../../utils/api/constants'

import { Ingredients } from './types'

export const fetchIngredients = createAsyncThunk<
  Ingredients[],
  void,
  { rejectValue: string; extra: ThunkExtraArgs<Ingredients[]> }
>('ingredients/fetchIngredients', async (_, { rejectWithValue, extra }) => {
  try {
    return await extra.api.get(ingredientsSlug)
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})
