import { FC, useState } from 'react'

import classNames from 'classnames'
import { clearIngredients } from '../../services/burger-constructor/burger-constructor-slice'
import { clearQuantity } from '../../services/ingredients/ingredients-slice'
import { useAppDispatch } from '../../utils/hooks/use-app-dispatch'

import { Modal } from '../modal/modal'

import { OrderDetails } from '../order-details/order-details'
import { ConstructorElements } from './constructor-elements/constructor-elements'
import { TotalPrice } from './total-price/total-price'

import styles from './burger-constructor.module.css'

export const BurgerConstructor: FC = () => {
  const [orderComplete, setOrderComplete] = useState(false)
  const dispatch = useAppDispatch()

  const onOrderAccept = (): void => {
    console.log('call')
    dispatch(clearQuantity())
    dispatch(clearIngredients())

    setOrderComplete(!orderComplete)
  }

  return (
    <section
      className={classNames(styles.burgerConstructor, 'mt-25 ml-4 mr-4')}
    >
      <ConstructorElements />

      <TotalPrice onOrderAccept={onOrderAccept} />

      {orderComplete && (
        <Modal onCloseHandler={onOrderAccept}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}
