import { FC, Fragment } from 'react'

import { useAppSelector } from '@/components/app/store/store'

import {
  getOrderError,
  getOrderIsLoading,
  getOrderNumber,
} from '@/services/order-details/selectors'

import { ReactComponent as OrderDone } from '@/images/order-done.svg'

import styles from './order-details.module.css'

export const OrderDetails: FC = () => {
  const orderNumber = useAppSelector(getOrderNumber)
  const error = useAppSelector(getOrderError)
  const isLoading = useAppSelector(getOrderIsLoading)

  if (!orderNumber && error) {
    return (
      <p className="text text_type_main-large mt-15">
        Ошибка, попробуйте снова!
      </p>
    )
  }

  if (isLoading) {
    return <p className="text text_type_main-large mt-15">Загрузка...</p>
  }

  return (
    <Fragment>
      <p className="text text_type_digits-large mt-4 mb-8">{orderNumber}</p>

      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>

      <OrderDone className={styles.orderIcon} />

      <p className="text text_type_main-small mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mt-2 mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </Fragment>
  )
}
