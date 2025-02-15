import { FC, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { OrderComposition } from '@/components/order-composition/order-composition'

import { fetchIngredients } from '@/services/ingredients/fetch-ingredients'
import { getIngredients } from '@/services/ingredients/selectors'
import { IngredientType } from '@/services/ingredients/types'

export const OrderCompositionPage: FC = () => {
  const dispatch = useAppDispatch()

  const ingredientsData = useAppSelector(getIngredients)

  useEffect(() => {
    if (!ingredientsData[IngredientType.MAIN].length)
      dispatch(fetchIngredients())
  }, [dispatch, ingredientsData])

  return (
    <div>
      <OrderComposition />
    </div>
  )
}

export default OrderCompositionPage
