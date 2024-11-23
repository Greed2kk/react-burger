import { rtkApi } from '../../../services/rtkApi'

import { IngredientsSchema } from '../../../services/ingredients/types'

export interface StateSchema {
  ingredients: IngredientsSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}
