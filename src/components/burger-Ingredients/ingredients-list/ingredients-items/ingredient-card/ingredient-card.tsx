import { FC, Fragment, useState } from 'react'

import classNames from 'classnames'

import { useDrag } from 'react-dnd'

import { useAppDispatch, useAppSelector } from '../../../../app/store/store'

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { addIngredientData } from '../../../../../services/ingredient-details/ingredient-details-slice'

import { getIngredientQuantity } from '../../../../../services/ingredients/ingredients'

import {
  type Ingredient,
  IngredientType,
} from '../../../../../services/ingredients/types'

import { IngredientDetails } from '../../../../ingredient-details/ingredient-details'

import { DndType } from './types'

import styles from './ingredient-card.module.css'

interface IngredientItemProps {
  ingredient: Ingredient
}

export const IngredientCard: FC<IngredientItemProps> = ({ ingredient }) => {
  const { image, name, price, _id, type, image_mobile } = ingredient
  const [openDetails, setOpenDetails] = useState(false)

  const dispatch = useAppDispatch()

  const quantity = useAppSelector(getIngredientQuantity(_id))

  const [{ isDrag }, dragRef] = useDrag(() => ({
    type: type === IngredientType.BUN ? DndType.BUN : DndType.INGREDIENT,
    item: {
      _id,
      price,
      type,
      name,
      imageMobile: image_mobile,
    },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const handleDetailsClick = (): void => {
    dispatch(addIngredientData(ingredient))

    setOpenDetails(true)
  }

  const handleCloseDetails = (): void => {
    setOpenDetails(false)
  }

  return (
    <Fragment>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        ref={dragRef}
        className={classNames(styles.ingredientCard, { [styles.drag]: isDrag })}
        onClick={handleDetailsClick}
        draggable
      >
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

      {openDetails && <IngredientDetails closeModal={handleCloseDetails} />}
    </Fragment>
  )
}
