import React from 'react'

import IngredientsItems from '../ingredients-items/ingredients-items'

import { IngredientItem } from '../ingredients-list'

import { IngredientType } from '../../../pages/burger-constructor-page/types'

import styles from './ingredients-category.module.css'

interface IngredientsCategoryProps {
  category: IngredientType
  ingredients: IngredientItem[]
  itemsId: string[]
}

export type CategoriesNames = {
  [IngredientType.BUN]: 'Булки'
  [IngredientType.MAIN]: 'Начинки'
  [IngredientType.SAUCE]: 'Соусы'
}

class IngredientsCategory extends React.Component<
  IngredientsCategoryProps,
  {}
> {
  render() {
    const { category, itemsId, ingredients } = this.props

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
}

export default IngredientsCategory
