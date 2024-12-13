import { FC, useState } from 'react'

import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { ConstructorElements } from '@/components/burger-constructor/constructor-elements/constructor-elements'
import { TotalPrice } from '@/components/burger-constructor/total-price/total-price'
import { Modal } from '@/components/modal/modal'
import { OrderDetails } from '@/components/order-details/order-details'
import { clearIngredients } from '@/services/burger-constructor/burger-constructor-slice'
import {
  selectBunId,
  selectIngredientsIds,
} from '@/services/burger-constructor/selectors'
import { createOrder } from '@/services/order-details/create-order'
import { clearDetailsData } from '@/services/order-details/order-details-slice'
import { getOrderIsLoading } from '@/services/order-details/selectors'

import styles from '@/components/burger-constructor/burger-constructor.module.css'

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

    dispatch(createOrder({ data: orderIngredients })).then(() => {
      dispatch(clearIngredients())
    })
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
