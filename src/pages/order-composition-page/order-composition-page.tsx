import { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { OrderComposition } from '@/components/order-composition/order-composition'

import { fetchIngredients } from '@/services/ingredients/fetch-ingredients'
import {
  getIngredients,
  getIngredientsIsLoading,
} from '@/services/ingredients/selectors'
import { IngredientType } from '@/services/ingredients/types'

import styles from './order-composition-page.module.css'

export const OrderCompositionPage: FC = () => {
  const dispatch = useAppDispatch()

  const ingredientsData = useAppSelector(getIngredients)

  const isLoading = useAppSelector(getIngredientsIsLoading)

  useEffect(() => {
    if (!ingredientsData[IngredientType.MAIN].length)
      dispatch(fetchIngredients())
  }, [dispatch, ingredientsData])

  if (isLoading) {
    return <p className="text text_type_main-default">Загрузка...</p>
  }

  return (
    <div className={styles.orderCompositionPage}>
      <OrderComposition />
    </div>
  )
}

export default OrderCompositionPage
