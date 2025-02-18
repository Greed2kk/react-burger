import { FC, Fragment, useEffect } from 'react'

import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { FeedItems } from '@/components/feed-items/feed-items'

import { fetchIngredients } from '@/services/ingredients/fetch-ingredients'
import { getIngredients } from '@/services/ingredients/selectors'
import { IngredientType } from '@/services/ingredients/types'

import { feed } from '@/utils/mockOrders'

import styles from './orders.module.css'

const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch()

  const ingredientsData = useAppSelector(getIngredients)

  useEffect(() => {
    if (!ingredientsData[IngredientType.MAIN].length)
      dispatch(fetchIngredients())
  }, [dispatch, ingredientsData])

  return (
    <Fragment>
      <div className={styles.orders}>
        <FeedItems ordersData={feed} profile />
      </div>

      <p
        className={classNames(
          styles.tip,
          'text text_type_main-default text_color_inactive',
        )}
      >
        В этом разделе вы можете просмотреть свою историю заказов
      </p>
    </Fragment>
  )
}

export default ProfileOrders
