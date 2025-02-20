import { FC, useMemo } from 'react'

import classNames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'

import { Order } from '@/services/feed-orders/types'
import { getIngredientsByIds } from '@/services/ingredients/selectors'
import { addOrderCompositionData } from '@/services/order-composition/order-composition-slice'

import { getTotalPrice } from '@/utils/helpers/getTotalPrice'
import { feedPath, profileOrdersPath } from '@/utils/route-paths'

import { FeedIngredients } from './feed-ingredients/feed-ingredients'

import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './feed-item.module.css'

interface FeedItemProps {
  order: Order
  profile?: boolean
}

export const FeedItem: FC<FeedItemProps> = ({ order, profile }) => {
  const {
    name,
    ingredients: orderIngredients,
    number,
    createdAt,
    status,
  } = order
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const ingredients = useAppSelector(getIngredientsByIds(orderIngredients))

  const price = useMemo(() => getTotalPrice(ingredients), [ingredients])

  const handleDetailsClick = (): void => {
    const selection = window.getSelection()

    if (selection && selection.toString().length > 0) {
      return
    }

    dispatch(
      addOrderCompositionData({
        number,
        name,
        ingredients: orderIngredients,
        status,
        createdAt,
      }),
    )

    if (profile) {
      navigate(`${profileOrdersPath}/${number}`, {
        state: { backgroundLocation: location },
      })
    } else {
      navigate(`${feedPath}/${number}`, {
        state: { backgroundLocation: location },
      })
    }


  }

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
