import { FC } from 'react'

import classNames from 'classnames'

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientItem } from '../../ingredients-list'

import styles from './ingredient-card.module.css'

interface IngredientItemProps {
  item: IngredientItem
}

export const IngredientCard: FC<IngredientItemProps> = (props) => {
  const {
    item: { image, name, price, __v },
  } = props

  const hasCounter = !!__v

  return (
    <div className={styles.ingredientCard}>
      <div className={classNames(styles.imageContainer, 'mb-1 pl-4 pr-4')}>
        <img src={image} alt={image} />
        {hasCounter && (
          <Counter count={__v} size='default' extraClass={styles.counter} />
        )}
      </div>

      <span className={classNames(styles.price, 'mb-1')}>
        <p className='text text_type_digits-default mr-2'>{price}</p>
        <CurrencyIcon type='primary' />
      </span>

      <p className={classNames(styles.name, 'text text_type_main-small mt-2')}>
        {name}
      </p>
    </div>
  )
}
