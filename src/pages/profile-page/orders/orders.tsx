import { FC, Fragment, useEffect } from 'react'

import classNames from 'classnames'

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '@/components/app/store/store'
import { FeedItems } from '@/components/feed-items/feed-items'

import { fetchIngredients } from '@/services/ingredients/fetch-ingredients'
import { getIngredients } from '@/services/ingredients/selectors'
import { IngredientType } from '@/services/ingredients/types'
import { profileOrdersWebSocketActions } from '@/services/profile-orders/actions'

import { wsProfileOrdersPath } from '@/utils/route-paths'

import styles from './orders.module.css'

const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch()

  const ingredientsData = useAppSelector(getIngredients)

  const feed = useAppSelector((state: RootState) => state.profileOrders.feed)

  useEffect(() => {
    dispatch(profileOrdersWebSocketActions.connect(wsProfileOrdersPath))

    return () => {
      dispatch(profileOrdersWebSocketActions.disconnect())
    }
  }, [dispatch])

  useEffect(() => {
    if (!ingredientsData[IngredientType.MAIN].length)
      dispatch(fetchIngredients())
  }, [dispatch, ingredientsData])

  return (
    <Fragment>
      {!feed.success ? (
        <h1>Загрузка...</h1>
      ) : (
        <div className={styles.orders}>
          <FeedItems ordersData={feed} profile />
        </div>
      )}

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
