import { FC } from 'react'

import classNames from 'classnames'

import { Ingredients } from '../../../pages/burger-constructor-page/types'

import { IngredientCard } from './ingredient-card/ingredient-card'

import styles from './ingredients-items.module.css'

interface IngredientsItemsProps {
  categoryIngredients: Ingredients[]
}

export const IngredientsItems: FC<IngredientsItemsProps> = props => {
  const { categoryIngredients } = props

  return (
    <section
      className={classNames(styles.ingredientsItems, 'pt-6 pl-4 pb-10 pr-4')}
    >
      {categoryIngredients.map(item => (
        <IngredientCard key={item._id} item={item} />
      ))}
    </section>
  )
}
