import { BurgerIngredient } from '@/services/burger-constructor/types'
import { Ingredient, IngredientType } from '@/services/ingredients/types'

type GetTotalPrice = (ingredients: (BurgerIngredient | Ingredient)[]) => number

export const getTotalPrice: GetTotalPrice = ingredients =>
  ingredients.reduce((prev, cur) => {
    if ('type' in cur && 'price' in cur) {
      if (cur.type === IngredientType.BUN) {
        return prev + cur.price * 2
      }

      return prev + cur.price
    }

    return prev
  }, 0)
