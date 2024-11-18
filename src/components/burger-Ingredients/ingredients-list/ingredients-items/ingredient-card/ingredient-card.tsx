import { FC, useState } from 'react'

import classNames from 'classnames'

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientDetails } from '../../../../ingredient-details/ingredient-details'
import { Ingredients } from '../../../../pages/burger-constructor-page/types'

import styles from './ingredient-card.module.css'

interface IngredientItemProps {
  item: Ingredients
}

export const IngredientCard: FC<IngredientItemProps> = ({
  item: {
    image,
    name,
    price,
    __v,
    image_large,
    fat,
    proteins,
    carbohydrates,
    calories,
  },
}) => {
  const [openDetails, setOpenDetails] = useState(false)

  const hasCounter = !!__v

  const handleDetailsClick = () => {
    setOpenDetails(true)
  }

  const handleCloseDetails = () => {
    setOpenDetails(false)
  }

  return (
    <>
      <div className={styles.ingredientCard} onClick={handleDetailsClick}>
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

        <p
          className={classNames(styles.name, 'text text_type_main-small mt-2')}
        >
          {name}
        </p>
      </div>

      {openDetails && (
        <IngredientDetails
          isOpen={openDetails}
          image={image_large}
          name={name}
          closeModal={handleCloseDetails}
          energyValue={{ calories, proteins, fat , carbohydrates,  }}
        />
      )}
    </>
  )
}
