import { FC, useState } from 'react'

import classNames from 'classnames'
import { useSelector } from 'react-redux'
import {
  selectBun,
  selectIngredients,
} from '../../services/burger-constructor/selectors/selectors'
import { addOrderDetails } from '../../services/order-details/order-details-slice'

import { useAppDispatch } from '../../utils/hooks/use-app-dispatch'

import { clearIngredients } from '../../services/burger-constructor/burger-constructor-slice'
import { clearQuantity } from '../../services/ingredients/ingredients-slice'

import { Modal } from '../modal/modal'

import { OrderDetails } from '../order-details/order-details'
import { ConstructorElements } from './constructor-elements/constructor-elements'
import { TotalPrice } from './total-price/total-price'

import styles from './burger-constructor.module.css'

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch()

  const [orderComplete, setOrderComplete] = useState(false)

  const bun = useSelector(selectBun)
  const ingredientsData = useSelector(selectIngredients)

  const ingredientsId = [...ingredientsData].map(i => i?._id)

  const ingredients = [bun?._id, ...ingredientsId, bun?._id] as string[]

  const onOrderAccept = (): void => {
    dispatch(clearQuantity())
    dispatch(clearIngredients())

    dispatch(addOrderDetails({ data: ingredients }))

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
