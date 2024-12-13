import { FC } from 'react'
import { useDrop } from 'react-dnd'

import classNames from 'classnames'

import styles from '@/components/burger-constructor/constructor-elements/constructor-placeholder/constructor-placeholder.module.css'

import { DndType } from '@/components/burger-Ingredients/ingredients-list/ingredients-items/ingredient-card/types'

interface ConstructorPlaceholderProps {
  isBun?: boolean
  isTop?: boolean
}

export const ConstructorPlaceholder: FC<ConstructorPlaceholderProps> = ({
  isBun,
  isTop,
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
