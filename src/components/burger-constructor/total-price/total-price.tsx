import { FC } from 'react'

import classNames from 'classnames'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { Button } from '../../button/button'
import { HtmlTypeButton, SizeButton } from '../../button/types'

import styles from './total-price.module.css'

interface TotalPriceProps {
  total: number
  onOrderAccept: () => void
}

export const TotalPrice: FC<TotalPriceProps> = ({ onOrderAccept, total }) => (
  <section className={classNames(styles.totalPrice, 'mt-10')}>
    <p className="text text_type_digits-medium mr-2">{total}</p>
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
