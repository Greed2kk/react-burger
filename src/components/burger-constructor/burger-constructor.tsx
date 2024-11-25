import { FC, useState } from 'react'

import classNames from 'classnames'

import { Ingredient, IngredientType } from '../../services/ingredients/types'

import { Modal } from '../modal/modal'

import { OrderDetails } from '../order-details/order-details'
import { ConstructorElements } from './constructor-elements/constructor-elements'
import { TotalPrice } from './total-price/total-price'

import { orderData } from '../../utils/data'

import { OrderData } from './total-price/types'

import styles from './burger-constructor.module.css'

export const BurgerConstructor: FC = () => {
  const { ingredients, id, status, recommendation } = orderData as OrderData

  const [orderComplete, setOrderComplete] = useState(false)

  const bun = ingredients.find(({ type }) => type === IngredientType.BUN)

  const onOrderAccept = (): void => {
    setOrderComplete(!orderComplete)
  }

  const allIngredients = [bun, ...ingredients] as Ingredient[]

  const totalPrice = allIngredients.reduce(
    (total, ingredient) => total + ingredient.price,
    bun?.price || 0,
  )

  return (
    <section
      className={classNames(styles.burgerConstructor, 'mt-25 ml-4 mr-4')}
    >
      <ConstructorElements allIngredients={allIngredients} />

      <TotalPrice total={totalPrice} onOrderAccept={onOrderAccept} />

      {orderComplete && (
        <Modal onCloseHandler={onOrderAccept}>
          <OrderDetails
            orderNumber={id}
            recommendation={recommendation}
            status={status}
          />
        </Modal>
      )}
    </section>
  )
}
