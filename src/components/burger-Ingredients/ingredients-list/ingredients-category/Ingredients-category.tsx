import { forwardRef } from 'react'

import {
  Ingredient,
  IngredientType,
} from '../../../../services/ingredients/types'

import { IngredientsItems } from '../ingredients-items/ingredients-items'

import styles from './ingredients-category.module.css'

interface IngredientsCategoryProps {
  category: IngredientType
  ingredients: Ingredient[]
  itemsId: string[]
}

export type CategoriesNames = {
  [IngredientType.BUN]: 'Булки'
  [IngredientType.MAIN]: 'Начинки'
  [IngredientType.SAUCE]: 'Соусы'
}

export const IngredientsCategory = forwardRef<
  HTMLElement,
  IngredientsCategoryProps
>((props, ref) => {
  const { category, itemsId, ingredients } = props

  const categoryNames: CategoriesNames = {
    [IngredientType.BUN]: 'Булки',
    [IngredientType.MAIN]: 'Начинки',
    [IngredientType.SAUCE]: 'Соусы',
  }

  const categoryIngredients = ingredients.filter(({ _id }) =>
    itemsId.some(id => _id === id),
  )

  return (
    <section className={styles.ingredientsCategory} ref={ref}>
      <p className="text text_type_main-medium">{categoryNames[category]}</p>

      <IngredientsItems categoryIngredients={categoryIngredients} />
    </section>
  )
})
