import { IngredientsSchema } from '../../../services/ingredients/types'
import { BurgerConstructorSchema } from '../../../services/burger-constructor/types'

export interface StateSchema {
  ingredients: IngredientsSchema
  burgerConstructor: BurgerConstructorSchema
}
