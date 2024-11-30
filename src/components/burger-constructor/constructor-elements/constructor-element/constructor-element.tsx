import { FC } from 'react'

import classNames from 'classnames'

import {
  ConstructorElement as YaConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { removeIngredient } from '../../../../services/burger-constructor/burger-constructor-slice'
import { decreaseQuantity } from '../../../../services/ingredients/ingredients-slice'
import { useAppDispatch } from '../../../app/store/store'

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
}

export const ConstructorElement: FC<ConstructorElementProps> = props => {
  const { text, type, isLocked, thumbnail, price, className, id, _id } = props
  const dispatch = useAppDispatch()

  const handleDelete = (): void => {
    dispatch(removeIngredient(id))
    dispatch(decreaseQuantity({ _id }))
  }

  return (
    <div className={styles.constructorElement}>
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
