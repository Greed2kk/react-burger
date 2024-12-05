import { FC } from 'react'

import classNames from 'classnames'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { selectTotalPrice } from '../../../services/burger-constructor/selectors'

import { useAppSelector } from '../../app/store/store'

import { Button } from '../../button/button'
import { HtmlTypeButton, SizeButton } from '../../button/types'

import styles from './total-price.module.css'

interface TotalPriceProps {
  onOrderAccept: () => void
  disabled?: boolean
}

export const TotalPrice: FC<TotalPriceProps> = ({
  onOrderAccept,
  disabled,
}) => {
  const totalPrice = useAppSelector(selectTotalPrice)

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
        disabled={disabled}
      >
        Оформить заказ
      </Button>
    </section>
  )
}
