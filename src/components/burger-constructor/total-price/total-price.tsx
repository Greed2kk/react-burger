import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import classNames from 'classnames'
import React from 'react'

import Button from '../../button/button'
import { HtmlTypeButton, SizeButton } from '../../button/types'

import styles from './total-price.module.css'

interface TotalPriceProps {
  total: number
}

class TotalPrice extends React.Component<TotalPriceProps, {}> {
  render() {
    const { total } = this.props

    return (
      <section className={classNames(styles.totalPrice, 'mt-10')}>
        <p className='text text_type_digits-medium mr-2'>{total}</p>
        <CurrencyIcon
          type='primary'
          className={classNames(styles.totalPriceIcon, 'mr-10')}
        />

        <Button htmlType={HtmlTypeButton.SUBMIT} size={SizeButton.LARGE}>
          Оформить заказ
        </Button>
      </section>
    )
  }
}

export default TotalPrice
