import { rtkApi } from '../../../services/rtk-api'

import { IngredientsSchema } from '../../../services/ingredients/types'
import { BurgerConstructorSchema } from '../../../services/burger-constructor/types'

export interface StateSchema {
  ingredients: IngredientsSchema
  burgerConstructor: BurgerConstructorSchema
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}
