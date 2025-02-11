import { FC, useMemo } from 'react'

import classNames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/components/app/store/store'

import { getIngredientsByIds } from '@/services/ingredients/selectors'

import { getTotalPrice } from '@/utils/helpers/getTotalPrice'
import { Order } from '@/utils/mockOrders'
import { feedPath } from '@/utils/route-paths'

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
  const location = useLocation()
  const navigate = useNavigate()

  const ingredients = useAppSelector(getIngredientsByIds(orderIngredients))

  const handleDetailsClick = (): void => {
    navigate(`${feedPath}/${number}`, {
      state: { backgroundLocation: location },
    })
  }

  const price = useMemo(() => getTotalPrice(ingredients), [ingredients])

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={classNames(styles.feedItem, 'p-6')}
      onClick={handleDetailsClick}
    >
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
