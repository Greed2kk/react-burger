import { FC } from 'react'

import classNames from 'classnames'

import {
  ConstructorElement as YaConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'

import { removeIngredient } from '../../../../services/burger-constructor/burger-constructor-slice'
import { decreaseQuantity } from '../../../../services/ingredients/ingredient-slice'
import { useAppDispatch } from '../../../app/store/store'
import { DndType } from '../../../burger-Ingredients/ingredients-list/ingredients-items/ingredient-card/types'

import styles from './constructor-element.module.css'

import { ConstructorElementType } from './types'

interface ConstructorElementProps {
  _id: string
  id: string
  text: string
  price: number
  thumbnail: string
  isLocked?: boolean
  type?: ConstructorElementType
  className?: string
  moveIngredient?: (dragIndex: number, hoverIndex: number) => void
  index?: number
}

export const ConstructorElement: FC<ConstructorElementProps> = props => {
  const {
    text,
    type,
    isLocked,
    thumbnail,
    price,
    className,
    id,
    _id,
    index = 0,
    moveIngredient,
  } = props

  const dispatch = useAppDispatch()

  const [{ isDragging }, drag] = useDrag({
    type: DndType.SORTABLE,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: DndType.SORTABLE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveIngredient?.(item.index, index)
        item.index = index
      }
    },
  })

  const handleDelete = (): void => {
    dispatch(removeIngredient(id))
    dispatch(decreaseQuantity({ _id }))
  }

  return (
    <div
      className={classNames(styles.constructorElement, {
        [styles.isDragging]: isDragging,
      })}
      draggable={!!isLocked}
      ref={!isLocked ? node => drag(drop(node)) : undefined}
    >
      {!isLocked && (
        <DragIcon
          type="primary"
          className={classNames(styles.dragElementItem, 'mr-2')}
        />
      )}

      <YaConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        handleClose={handleDelete}
        thumbnail={thumbnail}
        extraClass={classNames(
          styles.constructorElementItem,
          { 'ml-8': isLocked },
          className,
        )}
      />
    </div>
  )
}
