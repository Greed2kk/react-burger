import { FC, Fragment, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

import classNames from 'classnames'

import { useDispatch, useSelector } from 'react-redux'

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { addIngredient } from '../../../../../services/burger-constructor/burger-constructor-slice'
import { increaseQuantity } from '../../../../../services/ingredients/ingredients-slice'
import { getIngredientQuantity } from '../../../../../services/ingredients/selectors/ingredients'

import { Ingredient } from '../../../../../services/ingredients/types'

import { IngredientDetails } from '../../../../ingredient-details/ingredient-details'

import styles from './ingredient-card.module.css'

interface IngredientItemProps {
  item: Ingredient
}

export const IngredientCard: FC<IngredientItemProps> = ({
  item: { image, name, price, _id, type },
}) => {
  const [openDetails, setOpenDetails] = useState(false)

  const dispatch = useDispatch()
  const quantity = useSelector(getIngredientQuantity(_id))

  const handleDetailsClick = (): void => {
    const itemId = uuidv4()

    dispatch(addIngredient({ id: itemId, _id, price, type }))
    dispatch(increaseQuantity({ _id }))

    // setOpenDetails(true)
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
          {!!quantity && (
            <Counter
              count={quantity}
              size="default"
              extraClass={styles.counter}
            />
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
