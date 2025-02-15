import { type AuthSchema } from '@/services/auth/types'
import { type BurgerConstructorSchema } from '@/services/burger-constructor/types'
import { type IngredientDetailsSchema } from '@/services/ingredient-details/types'
import { type IngredientsSchema } from '@/services/ingredients/types'
import { type OrderCompositionSchema } from '@/services/order-composition/types'
import { type OrderDetailsSchema } from '@/services/order-details/types'

export interface StateSchema {
  ingredients: IngredientsSchema
  burgerConstructor: BurgerConstructorSchema
  orderDetails: OrderDetailsSchema
  ingredientDetails: IngredientDetailsSchema
  auth: AuthSchema
  orderComposition: OrderCompositionSchema
}
