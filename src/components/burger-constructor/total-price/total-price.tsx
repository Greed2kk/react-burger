import { FC } from 'react'

import classNames from 'classnames'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'

import { selectAllBurgerIngredients } from '../../../services/burger-constructor/burger-constructor-slice'
import { selectAllIngredients } from '../../../services/ingredients/ingredients-slice'
import { Ingredient, IngredientType } from '../../../services/ingredients/types'

import { Button } from '../../button/button'
import { HtmlTypeButton, SizeButton } from '../../button/types'

import styles from './total-price.module.css'

interface TotalPriceProps {
  onOrderAccept: () => void
}

export const TotalPrice: FC<TotalPriceProps> = ({ onOrderAccept }) => {
  const burgerIngredientsData: Ingredient[] = []

  const ingredients = useSelector(selectAllIngredients)
  const burgerIngredients = useSelector(selectAllBurgerIngredients)

  const bun = burgerIngredientsData.find(
    ({ type }) => type === IngredientType.BUN,
  )

  burgerIngredients.forEach(({ _id }) => {
    const ingredient = ingredients.find(item => item['_id'] === _id)

    if (ingredient) {
      burgerIngredientsData.push(ingredient)
    }
  })

  const totalPrice = burgerIngredientsData.reduce(
    (total, ingredient) => total + ingredient.price,
    bun?.price || 0,
  )

  return (
    <section className={classNames(styles.totalPrice, 'mt-10')}>
      <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
      <CurrencyIcon
        type="primary"
        className={classNames(styles.totalPriceIcon, 'mr-10')}
      />

      <Button
        htmlType={HtmlTypeButton.SUBMIT}
        size={SizeButton.LARGE}
        onClick={onOrderAccept}
      >
        Оформить заказ
      </Button>
    </section>
  )
}
