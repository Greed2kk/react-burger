import { createAsyncThunk } from '@reduxjs/toolkit'

import { ingredientsSlug } from '../../utils/api/constants'

import { api } from '../../utils/api/request'

import type { IngredientResponse } from './types'

export const fetchIngredients = createAsyncThunk<IngredientResponse>(
  'ingredients/fetchIngredients',
  async () => await api.get(ingredientsSlug),
)
