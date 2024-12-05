import React, { FC, UIEvent } from 'react'

import { useSectionsRefContext } from '../../../providers/category-ref-provider'

import { Categories, IngredientType } from '../../../services/ingredients/types'

import { IngredientsCategory } from './ingredients-category/Ingredients-category'

import styles from './ingredients-list.module.css'

interface IngredientsListProps {
  ingredients: Categories
  handleScroll: (e: UIEvent<HTMLElement> ) => void
}

export const IngredientsList: FC<IngredientsListProps> = ({
  ingredients,
  handleScroll,
}) => {
  const refs = useSectionsRefContext()

  return (
    <section className={styles.ingredientsList} onScroll={handleScroll}>
      {Object.entries(ingredients).map(([category, ingredientsIds], index) => (
        <IngredientsCategory
          ref={Object.values(refs)[index]}
          key={category}
          category={category as IngredientType}
          ingredientsIds={ingredientsIds}
        />
      ))}
    </section>
  )
}
