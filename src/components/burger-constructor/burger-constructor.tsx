import React from 'react'

import classNames from 'classnames'

import ConstructorElements from './constructor-elements/constructor-elements'
import TotalPrice from './total-price/total-price'

import styles from './burger-constructor.module.css'

class BurgerConstructor extends React.Component<{}, {}> {
  render() {
    return (
      <section className={classNames(styles.burgerConstructor, 'mt-25')}>
        <ConstructorElements />

        <TotalPrice total={1123} />
      </section>
    )
  }
}

export default BurgerConstructor
