import { FC, useState } from 'react'

import classNames from 'classnames'

import { createOrder } from '../../services/order-details/create-order'
import { clearDetailsData } from '../../services/order-details/order-details-slice'
import { getOrderIsLoading } from '../../services/order-details/selectors'

import { useAppDispatch, useAppSelector } from '../app/store/store'

import {
  selectBunId,
  selectIngredientsIds,
} from '../../services/burger-constructor/selectors'

import { Modal } from '../modal/modal'

import { OrderDetails } from '../order-details/order-details'
import { ConstructorElements } from './constructor-elements/constructor-elements'
import { TotalPrice } from './total-price/total-price'

import styles from './burger-constructor.module.css'

export const BurgerConstructor: FC = () => {
  const [orderComplete, setOrderComplete] = useState(false)

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getOrderIsLoading)

  const bunId = useAppSelector(selectBunId)
  const ingredientsIds = useAppSelector(selectIngredientsIds)

  const orderIngredients = [bunId, ...ingredientsIds, bunId]

  const disableOrder = isLoading || !bunId || !ingredientsIds.length

  const onOrderAccept = (): void => {
    setOrderComplete(!orderComplete)

    dispatch(createOrder({ data: orderIngredients }))
  }

  const onCloseModal = (): void => {
    setOrderComplete(!orderComplete)

    dispatch(clearDetailsData())
  }

  return (
    <section
      className={classNames(styles.burgerConstructor, 'mt-25 ml-4 mr-4')}
    >
      <ConstructorElements />

      <TotalPrice onOrderAccept={onOrderAccept} disabled={disableOrder} />

      {!isLoading && orderComplete && (
        <Modal onCloseHandler={onCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}
