import { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'
import { IngredientDetails } from '@/components/ingredient-details/ingredient-details'

import { fetchIngredients } from '@/services/ingredients/fetch-ingredients'
import {
  getIngredients,
  getIngredientsError,
  getIngredientsIsLoading,
} from '@/services/ingredients/selectors'
import { IngredientType } from '@/services/ingredients/types'

import styles from './ingredients-page.module.css'

const IngredientsPage: FC = () => {
  const dispatch = useAppDispatch()

  const ingredients = useAppSelector(getIngredients)
  const error = useAppSelector(getIngredientsError)
  const isLoading = useAppSelector(getIngredientsIsLoading)

  useEffect(() => {
    if (!ingredients[IngredientType.MAIN].length) dispatch(fetchIngredients())
  }, [dispatch, ingredients])

  if (error) {
    return <h1>{error}</h1>
  }

  if (isLoading) {
    return <h1>Загрузка</h1>
  }

  return (
    <ContentWrapper as="div" className={styles.ingredientsPage}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>

      <IngredientDetails />
    </ContentWrapper>
  )
}

export default IngredientsPage
