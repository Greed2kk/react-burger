import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseApiUrl } from '../utils/api/constants'

import { Ingredient } from './ingredients/types'

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
  }),
  endpoints: builder => ({
    fetchIngredients: builder.query<Ingredient[], void>({
      query: () => 'ingredients',
    }),
  }),
})
