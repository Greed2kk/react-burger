import React, { FC } from 'react'

import { Ingredient, IngredientType } from '../../../services/ingredients/types'

import { IngredientsCategory } from './ingredients-category/Ingredients-category'



import styles from './ingredients-list.module.css'

export interface Categories {
  [IngredientType.BUN]: Ingredient['_id'][]
  [IngredientType.MAIN]: Ingredient['_id'][]
  [IngredientType.SAUCE]: Ingredient['_id'][]
}

interface IngredientsListProps {
  ingredients: Ingredient[]
}

export const IngredientsList: FC<IngredientsListProps> = props => {
  const categories: Categories = {
    [IngredientType.BUN]: [],
    [IngredientType.MAIN]: [],
    [IngredientType.SAUCE]: [],
  }

  const { ingredients } = props

  ingredients.forEach(({ type, _id }) => categories[type].push(_id))

  return (
    <section className={styles.ingredientsList}>
      {Object.entries(categories).map(([category, itemsId]) => (
        <IngredientsCategory
          key={category}
          category={category as IngredientType}
          itemsId={itemsId}
          ingredients={ingredients}
        />
      ))}
    </section>
  )
}
