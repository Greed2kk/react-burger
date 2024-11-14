import React from 'react'

import IngredientsCategory from './ingredients-category/Ingredients-category'

import { IngredientType } from '../../pages/burger-constructor-page/types'

import styles from './ingredients-list.module.css'

export interface Categories {
  [IngredientType.BUN]: IngredientItem['_id'][]
  [IngredientType.MAIN]: IngredientItem['_id'][]
  [IngredientType.SAUCE]: IngredientItem['_id'][]
}

export type IngredientItem = {
  _id: string
  name: string
  type: IngredientType
  price: number
  image: string
  __v: number
}

interface IngredientsListProps {
  ingredients: IngredientItem[]
}

class IngredientsList extends React.Component<IngredientsListProps, {}> {
  render() {
    const categories: Categories = {
      [IngredientType.BUN]: [],
      [IngredientType.MAIN]: [],
      [IngredientType.SAUCE]: [],
    }

    const { ingredients } = this.props

    ingredients.forEach(({ type, _id }) => categories[type].push(_id))

    return (
      <section className={styles.ingredientsList}>
        {Object.entries(categories).map(([category, itemsId]) => {
          return (
            <IngredientsCategory
              key={category}
              category={category as IngredientType}
              itemsId={itemsId}
              ingredients={ingredients}
            />
          )
        })}
      </section>
    )
  }
}

export default IngredientsList
