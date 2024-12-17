import { FC } from 'react'

import classNames from 'classnames'
import { useDrag, useDrop } from 'react-dnd'

import { useAppDispatch } from '@/components/app/store/store'
import { ConstructorElementType } from '@/components/burger-constructor/constructor-elements/constructor-element/types'
import { DndType } from '@/components/burger-Ingredients/ingredients-list/ingredients-items/ingredient-card/types'

import { removeIngredient } from '@/services/burger-constructor/burger-constructor-slice'

import {
  ConstructorElement as YaConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './constructor-element.module.css'

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
    id,
    _id,
    index = 0,
    moveIngredient,
    isLocked,
    className,
    ...otherProps
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
  }

  return (
    <li
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
        handleClose={handleDelete}
        isLocked={isLocked}
        extraClass={classNames(
          styles.constructorElementItem,
          { 'ml-8': isLocked },
          className,
        )}
        {...otherProps}
      />
    </li>
  )
}
