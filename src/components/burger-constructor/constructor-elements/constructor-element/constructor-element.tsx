import React from 'react'

import classNames from 'classnames'

import {
  ConstructorElement as YaConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './constructor-element.module.css'

export enum ConstructorElementType {
  TOP = 'top',
  BOTTOM = 'bottom',
}

interface ConstructorElementProps {
  text: string
  price: number
  thumbnail: string
  isLocked?: boolean
  type?: ConstructorElementType
  className?: string
}

class ConstructorElement extends React.Component<ConstructorElementProps, {}> {
  render() {
    const { text, type, isLocked, thumbnail, price, className } = this.props

    return (
      <div className={styles.constructorElement}>
        {!isLocked && (
          <DragIcon
            type='primary'
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
            className
          )}
        />
      </div>
    )
  }
}

export default ConstructorElement
