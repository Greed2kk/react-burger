import { FC, useEffect, useMemo } from 'react'

import classNames from 'classnames'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { CompositionItem } from '@/components/order-composition/composition-item/composition-item'

import { getIngredientsByIds } from '@/services/ingredients/selectors'
import { Ingredient } from '@/services/ingredients/types'
import { getOrderComposition } from '@/services/order-composition/get-order-composition'
import {
  getOrderCompositionData,
  getOrderCompositionDataIsLoading,
} from '@/services/order-composition/selectors'
import { OrderStatus } from '@/services/order-composition/types'

import { getTotalPrice } from '@/utils/helpers/getTotalPrice'

import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './order-composition.module.css'

const humanStatuses: Record<OrderStatus, string> = {
  created: 'Создан',
  pending: 'Обрабатывается',
  done: 'Выполнен',
}

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

  const ingredients = useAppSelector(getIngredientsByIds(orderIngredients))

  const compositionItems = useMemo(() => {
    const items: Record<string, { ingredient: Ingredient; count: number }> = {}

    ingredients.forEach(ingredient => {
      if (items[ingredient._id]) {
        items[ingredient._id].count += 1
      } else {
        items[ingredient._id] = { ingredient, count: 1 }
      }
    })

    return Object.values(items).map(obj => obj)
  }, [ingredients])

  const price = useMemo(() => getTotalPrice(ingredients), [ingredients])

  useEffect(() => {
    if (!number) dispatch(getOrderComposition({ orderNumber }))
  }, [dispatch, number, orderNumber])

  if (isLoading) {
    return <h1>Загрузка...</h1>
  }

  return (
    <section className={styles.orderComposition}>
      <p
        className={classNames(
          styles.orderNumber,
          'text text_type_digits-default pb-10',
        )}
      >
        {`#${number}`}
      </p>

      <p className={classNames(styles.name, 'text text_type_main-medium mb-3')}>
        {name}
      </p>

      <p
        className={classNames('text text_type_main-small mb-15', styles.status)}
      >
        {humanStatuses[status]}
      </p>

      <p className="text text_type_main-medium mb-6">Состав:</p>

      <ul className={classNames(styles.orderCompositionList, 'mb-10 pr-6')}>
        {compositionItems.map(compositionItem => (
          <CompositionItem
            compositionItem={compositionItem}
            key={compositionItem.ingredient._id}
          />
        ))}
      </ul>

      <div className={styles.bottom}>
        <span
          className={classNames(
            styles.orderDate,
            'text text_type_main-default text_color_inactive',
          )}
        >
          <FormattedDate date={new Date(createdAt)} />
        </span>

        <span className={classNames(styles.price)}>
          <p className="text text_type_digits-default pr-1">{price}</p>

          <CurrencyIcon type="primary" />
        </span>
      </div>
    </section>
  )
}
