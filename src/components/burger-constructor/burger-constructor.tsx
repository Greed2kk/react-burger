import { FC, useState } from 'react'

import classNames from 'classnames'

import {
  Ingredients,
  IngredientType,
} from '../pages/burger-constructor-page/types'

import { OrderDetails } from '../order-details/order-details'
import { ConstructorElements } from './constructor-elements/constructor-elements'
import { TotalPrice } from './total-price/total-price'

import { OrderData } from './total-price/types'

import styles from './burger-constructor.module.css'

interface BurgerConstructorProps extends OrderData {}

export const BurgerConstructor: FC<BurgerConstructorProps> = ({
  id,
  status,
  recommendation,
  ingredients,
}) => {
  const [orderComplete, setOrderComplete] = useState(false)

  const bun = ingredients.find(({ type }) => type === IngredientType.BUN)

  const onOrderAccept = () => {
    setOrderComplete(!orderComplete)
  }

  const allIngredients = [bun, ...ingredients] as Ingredients[]

  console.log(allIngredients)

  const totalPrice = allIngredients.reduce(
    (total, ingredient) => total + ingredient.price,
    bun?.price || 0
  )

  return (
    <section
      className={classNames(styles.burgerConstructor, 'mt-25 ml-4 mr-4')}
    >
      <ConstructorElements allIngredients={allIngredients} />

      <TotalPrice total={totalPrice} onOrderAccept={onOrderAccept} />

      {orderComplete && (
        <OrderDetails
          isOpen={orderComplete}
          orderNumber={id}
          closeModal={onOrderAccept}
          recommendation={recommendation}
          status={status}
        />
      )}
    </section>
  )
}
