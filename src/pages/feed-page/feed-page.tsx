import { FC, useEffect } from 'react'

import classNames from 'classnames'
import { useSelector } from 'react-redux'

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '@/components/app/store/store'
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'
import { FeedItems } from '@/components/feed-items/feed-items'
import { OrderStatuses } from '@/components/order-statuses/order-statuses'

import { feedOrdersWebSocketActions } from '@/services/feed-orders/actions'
import { fetchIngredients } from '@/services/ingredients/fetch-ingredients'
import { getIngredients } from '@/services/ingredients/selectors'
import { IngredientType } from '@/services/ingredients/types'

import { wsFeedOrdersPath } from '@/utils/route-paths'

import styles from './feed-page.module.css'

const FeedPage: FC = () => {
  const dispatch = useAppDispatch()

  const feed = useSelector((state: RootState) => state.feedOrders.feed)

  useEffect(() => {
    dispatch(feedOrdersWebSocketActions.connect(wsFeedOrdersPath))

    return () => {
      dispatch(feedOrdersWebSocketActions.disconnect())
    }
  }, [dispatch])

  const ingredientsData = useAppSelector(getIngredients)

  useEffect(() => {
    if (!ingredientsData[IngredientType.MAIN].length)
      dispatch(fetchIngredients())
  }, [dispatch, ingredientsData])

  if (!feed.success) {
    return <h1>Загрузка</h1>
  }

  if (!feed.orders.length) {
    return <h1>Заказов нет</h1>
  }

  return (
    <ContentWrapper className="pl-5 pr-5">
      <h1 className="text text_type_main-large mb-5 mt-10">Лента заказов</h1>

      <ContentWrapper className={classNames(styles.feedPage)}>
        <FeedItems ordersData={feed} />

        <OrderStatuses ordersData={feed} />
      </ContentWrapper>
    </ContentWrapper>
  )
}

export default FeedPage
