import { rtkApi } from '../../../services/rtk-api'

import { IngredientsSchema } from '../../../services/ingredients/types'

export interface StateSchema {
  ingredients: IngredientsSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}
