import React from 'react'

import classNames from 'classnames'

import {
  Ingredients,
  IngredientType,
} from '../pages/burger-constructor-page/types'

import styles from './burger-constructor.module.css'

import ConstructorElements from './constructor-elements/constructor-elements'
import TotalPrice from './total-price/total-price'

interface BurgerConstructorProps {
  ingredients: Ingredients[]
}

class BurgerConstructor extends React.Component<BurgerConstructorProps, {}> {
  render() {
    const { ingredients } = this.props
    const bun = ingredients.find(({ type }) => type === IngredientType.BUN)

    const sauces = ingredients
      .filter(({ type }) => type === IngredientType.SAUCE)
      .slice(0, 2)

    const main = ingredients
      .filter(({ type }) => type === IngredientType.MAIN)
      .slice(2, 5)

    const allIngredients = [bun, ...sauces, ...main] as Ingredients[]

    const totalPrice = allIngredients.reduce(
      (total, ingredient) => total + ingredient.price,
      bun?.price || 0
    )

    return (
      <section className={classNames(styles.burgerConstructor, 'mt-25')}>
        <ConstructorElements allIngredients={allIngredients} />

        <TotalPrice total={totalPrice} />
      </section>
    )
  }
}

export default BurgerConstructor
