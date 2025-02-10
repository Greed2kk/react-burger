import { FC } from 'react'

import { Feed } from '@/utils/mockOrders'

import { FeedItem } from './feed-item/feed-item'

import styles from './feed-items.module.css'

interface FeedItemsProps {
  feed?: Feed
}

export const FeedItems: FC<FeedItemsProps> = ({ feed }) => {
  const { orders } = feed || {}

  return (
    <div className={styles.feedItems}>
      {orders?.map(order => {
        if (!order.ingredients) {
          return null
        }

        return <FeedItem order={order} key={order._id} />
      })}
    </div>
  )
}
