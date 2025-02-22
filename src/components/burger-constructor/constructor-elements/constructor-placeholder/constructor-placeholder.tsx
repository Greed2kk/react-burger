import { FC } from 'react'

import classNames from 'classnames'
import { useDrop } from 'react-dnd'

import { DndType } from '@/components/burger-Ingredients/ingredients-list/ingredients-items/ingredient-card/types'

import styles from './constructor-placeholder.module.css'

interface ConstructorPlaceholderProps {
  isBun?: boolean
  isTop?: boolean
}

export const ConstructorPlaceholder: FC<ConstructorPlaceholderProps> = ({
  isBun,
  isTop,
  ...props
}) => {
  const [{ isOver, canDrop }, ref] = useDrop({
    accept: isBun ? DndType.BUN : DndType.INGREDIENT,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const tip = isBun ? 'Перетащите булку' : 'Перетащите соус или начинку'

  const positionClassName = isTop
    ? `${styles.placeholderBunTop}`
    : `${styles.placeholderBunBottom}`

  return (
    <div
      {...props}
      ref={ref}
      className={classNames(
        styles.constructorPlaceholder,
        { [styles.dropOver]: isOver },
        { [styles.canDrop]: canDrop },
        'ml-8',
        isBun && positionClassName,
      )}
    >
      <p className="text text_type_main-default text_color_inactive">{tip}</p>
    </div>
  )
}
