import { FC, useState } from 'react'

import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { ConstructorElements } from '@/components/burger-constructor/constructor-elements/constructor-elements'
import { TotalPrice } from '@/components/burger-constructor/total-price/total-price'
import { Modal } from '@/components/modal/modal'
import { OrderDetails } from '@/components/order-details/order-details'

import { getIsAuthenticated } from '@/services/auth/selectors'
import {
  selectBunId,
  selectIngredientsIds,
} from '@/services/burger-constructor/selectors'
import { createOrder } from '@/services/order-details/create-order'
import { clearDetailsData } from '@/services/order-details/order-details-slice'
import { getOrderIsLoading } from '@/services/order-details/selectors'

import { loginPath } from '@/utils/route-paths'

import styles from './burger-constructor.module.css'

export const BurgerConstructor: FC = () => {
  const [orderComplete, setOrderComplete] = useState(false)
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getOrderIsLoading)

  const bunId = useAppSelector(selectBunId)
  const ingredientsIds = useAppSelector(selectIngredientsIds)

  const orderIngredients = [bunId, ...ingredientsIds, bunId]

  const disableOrder = isLoading || !bunId || !ingredientsIds.length

  const onOrderAccept = (): void => {
    if (!isAuthenticated) {
      navigate(loginPath)
    } else {
      setOrderComplete(!orderComplete)

      dispatch(createOrder({ data: orderIngredients }))
    }
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
