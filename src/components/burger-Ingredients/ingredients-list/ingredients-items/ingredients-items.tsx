import { FC } from 'react'

import classNames from 'classnames'

import { getIngredientsByIds } from '../../../../services/ingredients/selectors/ingredients'

import { useAppSelector } from '../../../app/store/store'

import { IngredientCard } from './ingredient-card/ingredient-card'

import styles from './ingredients-items.module.css'

interface IngredientsItemsProps {
  ingredientsIds: string[]
}

export const IngredientsItems: FC<IngredientsItemsProps> = ({
  ingredientsIds,
}) => {
  const ingredients = useAppSelector(getIngredientsByIds(ingredientsIds))

  return (
    <section
      className={classNames(styles.ingredientsItems, 'pt-6 pl-4 pb-10 pr-4')}
    >
      {ingredients.map(ingredient => (
        <IngredientCard key={ingredient._id} ingredient={ingredient} />
      ))}
    </section>
  )
}
