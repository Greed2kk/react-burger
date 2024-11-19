import React, { FC } from 'react'

import { IngredientsCategory } from './ingredients-category/Ingredients-category'

import {
  Ingredients,
  IngredientType,
} from '../../pages/burger-constructor-page/types'

import styles from './ingredients-list.module.css'

export interface Categories {
  [IngredientType.BUN]: Ingredients['_id'][]
  [IngredientType.MAIN]: Ingredients['_id'][]
  [IngredientType.SAUCE]: Ingredients['_id'][]
}

interface IngredientsListProps {
  ingredients: Ingredients[]
}

export const IngredientsList: FC<IngredientsListProps> = (props) => {
  const categories: Categories = {
    [IngredientType.BUN]: [],
    [IngredientType.MAIN]: [],
    [IngredientType.SAUCE]: [],
  }

  const { ingredients } = props

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
