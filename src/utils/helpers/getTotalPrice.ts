import { BurgerIngredient } from '@/services/burger-constructor/types'
import { Ingredient } from '@/services/ingredients/types'

type GetTotalPrice = (ingredients: (BurgerIngredient | Ingredient)[]) => number

export const getTotalPrice: GetTotalPrice = ingredients =>
  ingredients.reduce((prev, cur) => {
    if ('type' in cur && 'price' in cur) {
      return prev + cur.price
    }

    return prev
  }, 0)
