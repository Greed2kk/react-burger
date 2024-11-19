import { FC } from 'react'

import { IngredientsItems } from '../ingredients-items/ingredients-items'

import {
  Ingredients,
  IngredientType,
} from '../../../pages/burger-constructor-page/types'

import styles from './ingredients-category.module.css'

interface IngredientsCategoryProps {
  category: IngredientType
  ingredients: Ingredients[]
  itemsId: string[]
}

export type CategoriesNames = {
  [IngredientType.BUN]: 'Булки'
  [IngredientType.MAIN]: 'Начинки'
  [IngredientType.SAUCE]: 'Соусы'
}

export const IngredientsCategory: FC<IngredientsCategoryProps> = (props) => {
  const { category, itemsId, ingredients } = props

  const categoryNames: CategoriesNames = {
    [IngredientType.BUN]: 'Булки',
    [IngredientType.MAIN]: 'Начинки',
    [IngredientType.SAUCE]: 'Соусы',
  }

  const categoryIngredients = ingredients.filter(({ _id }) =>
    itemsId.some((id) => _id === id)
  )

  return (
    <section className={styles.ingredientsCategory}>
      <p className='text text_type_main-medium'>{categoryNames[category]}</p>

      <IngredientsItems categoryIngredients={categoryIngredients} />
    </section>
  )
}
