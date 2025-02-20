import { FC, useMemo } from 'react'

import classNames from 'classnames'

import { Feed } from '@/services/feed-orders/types'

import styles from './order-statuses.module.css'

interface OrderStatusesProps {
  ordersData?: Feed
}

export const OrderStatuses: FC<OrderStatusesProps> = ({ ordersData }) => {
  const { total, totalToday, orders = [] } = ordersData || {}

  const done = useMemo(
    () =>
      [...orders]
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .filter(({ status }) => status === 'done')
        .map(({ number }) => number)
        .slice(0, 10),
    [orders],
  )

  const workInProgress = useMemo(
    () =>
      [...orders]
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .filter(({ status }) => status === 'created' || status === 'pending')
        .map(({ number }) => number)
        .slice(0, 14),
    [orders],
  )

  return (
    <div className={styles.orderStatuses}>
      <section className={styles.orderProgress}>
        <div>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={styles.orderList}>
            {done &&
              done.map(order => (
                <li
                  className={classNames(
                    styles.orderDone,
                    'text text_type_digits-default',
                  )}
                  key={order}
                >
                  {order}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={styles.orderList}>
            {workInProgress &&
              workInProgress.map(order => (
                <li className="text text_type_digits-default" key={order}>
                  {order}
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section>
        <p className="text text_type_main-medium">Выполнено за все время:</p>

        <p className="text text_type_digits-large">{total}</p>
      </section>

      <section>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>

        <p className="text text_type_digits-large">{totalToday}</p>
      </section>
    </div>
  )
}
