import { FC } from 'react'

import { Modal } from '../modal/modal'

import { ReactComponent as OrderDone } from '../../images/order-done.svg'

import styles from './order-details.module.css'

interface OrderDetailsProps {
  isOpen: boolean
  closeModal: () => void
  orderNumber: string
  status: string
  recommendation: string
}

export const OrderDetails: FC<OrderDetailsProps> = ({
  isOpen,
  closeModal,
  orderNumber,
  status,
  recommendation,
}) => {
  return (
    <>
      {isOpen && (
        <Modal onCloseHandler={closeModal}>
          <p className='text text_type_digits-large mt-4 mb-8'>{orderNumber}</p>

          <p className='text text_type_main-medium mb-15'>
            идентификатор заказа
          </p>

          <OrderDone className={styles.orderIcon} />

          <p className='text text_type_main-small mt-15'>{status}</p>
          <p className='text text_type_main-small text_color_inactive mt-2 mb-20'>{recommendation}</p>
        </Modal>
      )}
    </>
  )
}
