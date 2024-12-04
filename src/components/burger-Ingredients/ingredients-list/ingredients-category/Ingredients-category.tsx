import { forwardRef } from 'react'

import { Ingredient, IngredientType } from '../../../../services/ingredients/types'

import { IngredientsItems } from '../ingredients-items/ingredients-items'

import styles from './ingredients-category.module.css'

interface IngredientsCategoryProps {
  category: IngredientType
  ingredientsIds: Ingredient['_id'][]
}

const categoryNames = {
  [IngredientType.BUN]: 'Булки',
  [IngredientType.MAIN]: 'Начинки',
  [IngredientType.SAUCE]: 'Соусы',
}

export const IngredientsCategory = forwardRef<
  HTMLElement,
  IngredientsCategoryProps
>(({ ingredientsIds, category }, ref) => (
  <section className={styles.ingredientsCategory} ref={ref}>
    <p className="text text_type_main-medium">{categoryNames[category]}</p>

    <IngredientsItems ingredientsIds={ingredientsIds} />
  </section>
))
