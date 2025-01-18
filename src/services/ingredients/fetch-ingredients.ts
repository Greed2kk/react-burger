import { createAsyncThunk } from '@reduxjs/toolkit'

import type { IngredientResponse } from '@/services/ingredients/types'

import { ingredientsSlug } from '@/utils/api/constants'
import { api } from '@/utils/api/request'

export const fetchIngredients = createAsyncThunk<IngredientResponse>(
  'ingredients/fetchIngredients',
  async () => await api.get(ingredientsSlug),
)
