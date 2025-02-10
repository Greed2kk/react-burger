import { FC } from 'react'

import { Ingredient } from '@/services/ingredients/types'

import { FeedIngredient } from './feed-ingredient/feed-ingredient'

import styles from './feed-ingredients.module.css'

interface FeedIngredientsProps {
  ingredients: Ingredient[]
}

export const FeedIngredients: FC<FeedIngredientsProps> = ({ ingredients }) => {
  const remain = ingredients.length - 6

  return (
    <div className={styles.feedIngredients}>
      {ingredients.map((ingredient, index) => {
        if (ingredients.length >= 6) {
          if (index === 5) {
            return <FeedIngredient key={index} ingredient={ingredient} remain={remain} />
          }

          if (index >= 6) {
            return null
          }

          return <FeedIngredient key={index} ingredient={ingredient} />
        } else {
          return <FeedIngredient key={index} ingredient={ingredient} />
        }
      })}
    </div>
  )
}
