import { FC, useEffect } from 'react'

import { useInView } from 'react-intersection-observer'

import {
  Ingredient,
  IngredientType,
} from '../../../../services/ingredients/types'

import { IngredientsItems } from '../ingredients-items/ingredients-items'

import styles from './ingredients-category.module.css'

interface IngredientsCategoryProps {
  category: IngredientType
  ingredientsIds: Ingredient['_id'][]
  setActiveTab: (
    category: IngredientType,
    inView: boolean,
  ) => void
}

const categoryNames = {
  [IngredientType.BUN]: 'Булки',
  [IngredientType.SAUCE]: 'Соусы',
  [IngredientType.MAIN]: 'Начинки',
}

export const IngredientsCategory: FC<IngredientsCategoryProps> = ({
  ingredientsIds,
  category,
  setActiveTab,
}) => {
  const { ref, inView } = useInView({ threshold: 0.1 })

  useEffect(() => {
    setActiveTab(category, inView)
  }, [category, inView, setActiveTab])

  return (
    <li className={styles.ingredientsCategory} ref={ref} id={category}>
      <p className="text text_type_main-medium">{categoryNames[category]}</p>

      <IngredientsItems ingredientsIds={ingredientsIds} />
    </li>
  )
}
