import { FC } from 'react'

import classNames from 'classnames'

import { useAppSelector } from '@/components/app/store/store'
import { IngredientCard } from '@/components/burger-Ingredients/ingredients-list/ingredients-items/ingredient-card/ingredient-card'

import { getIngredientsByIds } from '@/services/ingredients/selectors'

import styles from './ingredients-items.module.css'

interface IngredientsItemsProps {
  ingredientsIds: string[]
}

export const IngredientsItems: FC<IngredientsItemsProps> = ({
  ingredientsIds,
}) => {
  const ingredients = useAppSelector(getIngredientsByIds(ingredientsIds))

  return (
    <ul className={classNames(styles.ingredientsItems, 'pt-6 pl-4 pb-10 pr-4')}>
      {ingredients.map(ingredient => (
        <IngredientCard key={ingredient._id} ingredient={ingredient} />
      ))}
    </ul>
  )
}
