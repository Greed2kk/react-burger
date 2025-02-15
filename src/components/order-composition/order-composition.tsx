import { FC, useEffect, useMemo } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'

import { getIngredientsByIds } from '@/services/ingredients/selectors'
import { getOrderComposition } from '@/services/order-composition/get-order-composition'
import {
  getOrderCompositionData,
  getOrderCompositionDataIsLoading,
} from '@/services/order-composition/selectors'

import { getTotalPrice } from '@/utils/helpers/getTotalPrice'

export const OrderComposition: FC = () => {
  const { orderNumber = '' } = useParams<{ orderNumber: string }>()
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(getOrderCompositionDataIsLoading)

  const {
    name,
    ingredients: orderIngredients,
    number,
    createdAt,
    status,
  } = useAppSelector(getOrderCompositionData)

  console.log(name, orderIngredients, number, createdAt, status)

  const ingredients = useAppSelector(getIngredientsByIds(orderIngredients))

  const price = useMemo(() => getTotalPrice(ingredients), [ingredients])

  useEffect(() => {
    if (!number) dispatch(getOrderComposition({ orderNumber }))
  }, [dispatch, number, orderNumber])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div>
      {createdAt}
      <div>{status}</div>
      <div>{price}</div>

      <div>{name}</div>
    </div>
  )
}
