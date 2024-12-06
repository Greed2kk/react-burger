import React, { FC } from 'react'

import { Categories, IngredientType } from '../../../services/ingredients/types'

import { IngredientsCategory } from './ingredients-category/Ingredients-category'

import styles from './ingredients-list.module.css'

interface IngredientsListProps {
  ingredients: Categories
  setActiveTab: (
    category: IngredientType,
    inView: boolean,
  ) => void
}

export const IngredientsList: FC<IngredientsListProps> = ({
  ingredients,
  setActiveTab,
}) => (
  <section className={styles.ingredientsList}>
    {Object.entries(ingredients).map(([category, ingredientsIds]) => (
      <IngredientsCategory
        setActiveTab={setActiveTab}
        key={category}
        category={category as IngredientType}
        ingredientsIds={ingredientsIds}
      />
    ))}
  </section>
)
