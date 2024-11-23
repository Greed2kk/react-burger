import { FC, Fragment } from 'react'

import { ReactComponent as OrderDone } from '../../images/order-done.svg'

import styles from './order-details.module.css'

interface OrderDetailsProps {
  orderNumber: string
  status: string
  recommendation: string
}

export const OrderDetails: FC<OrderDetailsProps> = ({
  orderNumber,
  status,
  recommendation,
}) => (
  <Fragment>
    <p className="text text_type_digits-large mt-4 mb-8">{orderNumber}</p>

    <p className="text text_type_main-medium mb-15">идентификатор заказа</p>

    <OrderDone className={styles.orderIcon} />

    <p className="text text_type_main-small mt-15">{status}</p>
    <p className="text text_type_main-small text_color_inactive mt-2 mb-20">
      {recommendation}
    </p>
  </Fragment>
)
