import React, { FC } from 'react'

import { IngredientsCategory } from '@/components/burger-Ingredients/ingredients-list/ingredients-category/Ingredients-category'

import styles from '@/components/burger-Ingredients/ingredients-list/ingredients-list.module.css'

import { Categories, IngredientType } from '@/services/ingredients/types'

interface IngredientsListProps {
  ingredients: Categories
  setActiveTab: (category: IngredientType, inView: boolean) => void
}

export const IngredientsList: FC<IngredientsListProps> = ({
  ingredients,
  setActiveTab,
}) => (
  <ul className={styles.ingredientsList}>
    {Object.entries(ingredients).map(([category, ingredientsIds]) => (
      <IngredientsCategory
        setActiveTab={setActiveTab}
        key={category}
        category={category as IngredientType}
        ingredientsIds={ingredientsIds}
      />
    ))}
  </ul>
)
