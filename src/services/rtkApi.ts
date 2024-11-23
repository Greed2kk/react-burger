import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseApiUrl } from '../utils/api/constants'

import { Ingredients } from './ingredients/types'

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
  }),
  endpoints: builder => ({
    fetchIngredients: builder.query<Ingredients[], void>({
      query: () => 'ingredients',
    }),
  }),
})
