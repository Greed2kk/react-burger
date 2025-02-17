import { FC } from 'react'

import classNames from 'classnames'

import { Ingredient } from '@/services/ingredients/types'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './composition-item.module.css'

interface CompositionItemProps {
  compositionItem: {
    ingredient: Ingredient
    count: number
  }
}

export const CompositionItem: FC<CompositionItemProps> = ({
  compositionItem,
}) => {
  const {
    ingredient: { image_mobile, name, price },
    count,
  } = compositionItem

  return (
    <li className={styles.compositionItem}>
      <div className={classNames(styles.ingredientImageContainer, 'mr-4')}>
        <img className={styles.ingredientImage} src={image_mobile} alt={name} />
      </div>

      <p className="text text_type_main-default">{name}</p>

      <div className={styles.totalPrice}>
        {count > 1 && (
          <p className="text text_type_digits-default">
            {`${count} x`}
            &nbsp;
          </p>
        )}
        <p className="text text_type_digits-default pr-1">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}
