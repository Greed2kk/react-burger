import React, { forwardRef } from 'react'

import { useSectionsRefContext } from '../../../providers/category-ref-provider'

import { Categories, IngredientType } from '../../../services/ingredients/types'

import { IngredientsCategory } from './ingredients-category/Ingredients-category'

import styles from './ingredients-list.module.css'

interface IngredientsListProps {
  ingredients: Categories
}

export type Ref = HTMLElement

export const IngredientsList = forwardRef<Ref, IngredientsListProps>(
  ({ ingredients }, ref) => {
    const refs = useSectionsRefContext()

    return (
      <section className={styles.ingredientsList} ref={ref}>
        {Object.entries(ingredients).map(
          ([category, ingredientsIds], index) => (
            <IngredientsCategory
              ref={Object.values(refs)[index]}
              key={category}
              category={category as IngredientType}
              ingredientsIds={ingredientsIds}
            />
          ),
        )}
      </section>
    )
  },
)
