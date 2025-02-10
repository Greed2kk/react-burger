import { FC, useMemo } from 'react'

import classNames from 'classnames'

import { useAppSelector } from '@/components/app/store/store'

import { getIngredientsByIds } from '@/services/ingredients/selectors'

import { getTotalPrice } from '@/utils/helpers/getTotalPrice'
import { Order } from '@/utils/mockOrders'

import { FeedIngredients } from './feed-ingredients/feed-ingredients'

import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './feed-item.module.css'

interface FeedItemProps {
  order: Order
}

export const FeedItem: FC<FeedItemProps> = ({ order }) => {
  const { name, ingredients: orderIngredients, number, createdAt } = order

  const ingredients = useAppSelector(getIngredientsByIds(orderIngredients))

  const price = useMemo(
    () => getTotalPrice(ingredients),
    [ingredients],
  )

  return (
    <div className={classNames(styles.feedItem, 'p-6')}>
      <section className={classNames(styles.itemSection, 'mb-6')}>
        <span className="text text_type_digits-default">{`#${number}`}</span>
        <span
          className={classNames(
            styles.orderDate,
            'text text_type_main-default text_color_inactive',
          )}
        >
          <FormattedDate date={new Date(createdAt)} />
        </span>
      </section>

      <span className="text text_type_main-medium">{name}</span>

      <section className={classNames(styles.itemSection, 'mt-6')}>
        <FeedIngredients ingredients={ingredients} />

        <span className={classNames(styles.orderPrice)}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </span>
      </section>
    </div>
  )
}
