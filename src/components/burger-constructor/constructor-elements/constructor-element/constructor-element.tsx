import { FC } from 'react'

import classNames from 'classnames'

import {
  ConstructorElement as YaConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './constructor-element.module.css'

import { ConstructorElementType } from './types'

interface ConstructorElementProps {
  text: string
  price: number
  thumbnail: string
  isLocked?: boolean
  type?: ConstructorElementType
  className?: string
}

export const ConstructorElement: FC<ConstructorElementProps> = props => {
  const { text, type, isLocked, thumbnail, price, className } = props

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
