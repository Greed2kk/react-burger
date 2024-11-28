import { FC, useState } from 'react'

import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../app/store/store'

import {
  selectBunId,
  selectIngredientsIds,
} from '../../services/burger-constructor/selectors/selectors'
import { addOrderDetails } from '../../services/order-details/order-details-slice'

import { Modal } from '../modal/modal'

import { OrderDetails } from '../order-details/order-details'
import { ConstructorElements } from './constructor-elements/constructor-elements'
import { TotalPrice } from './total-price/total-price'

import styles from './burger-constructor.module.css'

export const BurgerConstructor: FC = () => {
  const [orderComplete, setOrderComplete] = useState(false)
  const dispatch = useAppDispatch()

  const bunId = useAppSelector(selectBunId)
  const ingredientsIds = useAppSelector(selectIngredientsIds)

  const orderIngredients = [bunId, ...ingredientsIds, bunId]

  const onOrderAccept = (): void => {
    dispatch(addOrderDetails({ data: orderIngredients }))

    setOrderComplete(!orderComplete)
  }

  const onCloseModal = (): void => {
    setOrderComplete(!orderComplete)
  }

  return (
    <section
      className={classNames(styles.burgerConstructor, 'mt-25 ml-4 mr-4')}
    >
      <ConstructorElements />

      <TotalPrice onOrderAccept={onOrderAccept} />

      {orderComplete && (
        <Modal onCloseHandler={onCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}
