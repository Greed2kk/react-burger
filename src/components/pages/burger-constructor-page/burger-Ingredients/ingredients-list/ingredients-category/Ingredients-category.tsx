import React from 'react'

import { IngredientType } from '../../burger-ingredients'

import { IngredientItem } from '../ingredients-list'

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
    const { category } = this.props // itemsId // ingredients

    const categoryNames: CategoriesNames = {
      [IngredientType.BUN]: 'Булки',
      [IngredientType.MAIN]: 'Начинки',
      [IngredientType.SAUCE]: 'Соусы',
    }

    return (
      <section>
        <p className='text text_type_main-medium'>{categoryNames[category]}</p>
      </section>
    )
  }
}

export default IngredientsCategory
