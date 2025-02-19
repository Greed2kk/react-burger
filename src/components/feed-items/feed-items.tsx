import { FC } from 'react'

import { Feed } from '@/services/feed-orders/types'

import { FeedItem } from './feed-item/feed-item'

import styles from './feed-items.module.css'

interface FeedItemsProps {
  ordersData?: Feed
  profile?: boolean
}

export const FeedItems: FC<FeedItemsProps> = ({ ordersData, profile }) => {
  const { orders = [] } = ordersData || {}

  return (
    <div className={styles.feedItems}>
      {orders.map(order => {
        if (!order.ingredients) {
          return null
        }

        return <FeedItem order={order} key={order._id} profile={profile} />
      })}
    </div>
  )
}
