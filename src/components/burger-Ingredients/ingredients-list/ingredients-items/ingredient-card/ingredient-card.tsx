import { FC, Fragment, useState } from 'react'

import classNames from 'classnames'

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Ingredient } from '../../../../../services/ingredients/types'

import { IngredientDetails } from '../../../../ingredient-details/ingredient-details'

import styles from './ingredient-card.module.css'

interface IngredientItemProps {
  item: Ingredient
}

export const IngredientCard: FC<IngredientItemProps> = ({
  item: { image, name, price, __v, _id },
}) => {
  const [openDetails, setOpenDetails] = useState(false)

  const hasCounter = !!__v

  const handleDetailsClick = (): void => {
    setOpenDetails(true)
  }

  const handleCloseDetails = (): void => {
    setOpenDetails(false)
  }

  return (
    <Fragment>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={styles.ingredientCard} onClick={handleDetailsClick}>
        <div className={classNames(styles.imageContainer, 'mb-1 pl-4 pr-4')}>
          <img src={image} alt={image} />
          {hasCounter && (
            <Counter count={__v} size="default" extraClass={styles.counter} />
          )}
        </div>

        <span className={classNames(styles.price, 'mb-1')}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </span>

        <p
          className={classNames(styles.name, 'text text_type_main-small mt-2')}
        >
          {name}
        </p>
      </div>

      {openDetails && (
        <IngredientDetails id={_id} closeModal={handleCloseDetails} />
      )}
    </Fragment>
  )
}
