import { FC } from 'react'

import classNames from 'classnames'

import { Ingredient } from '@/services/ingredients/types'

import styles from './feed-ingredient.module.css'

interface FeedIngredientProps {
  ingredient: Ingredient
  remain?: number
}

export const FeedIngredient: FC<FeedIngredientProps> = ({
  ingredient,
  remain,
}) => {
  const {image, name} = ingredient

  return (
    <div className={styles.feedIngredient}>
      {remain ? (
        <div className={styles.remain}>
          <img
            className={styles.image}
            src={image}
            alt={name}
          />

          <span
            className={classNames(styles.count, 'text text_type_main-default')}
          >
            {`+${remain}`}
          </span>
        </div>
      ) : (
        <img
          className={styles.image}
          src={image}
          alt={name}
        />
      )}
    </div>
  )
}
