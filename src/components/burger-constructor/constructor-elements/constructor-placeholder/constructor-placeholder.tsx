import { FC } from 'react'

import classNames from 'classnames'

import styles from './constructor-placeholder.module.css'

interface ConstructorPlaceholderProps {
  isBun?: boolean
  isTop?: boolean
}

export const ConstructorPlaceholder: FC<ConstructorPlaceholderProps> = ({
  isBun,
  isTop,
}) => {
  const tip = isBun ? 'Перетащите булку' : 'Перетащите соус или начинку'

  const positionClassName = isTop
    ? `${styles.placeholderBunTop}`
    : `${styles.placeholderBunBottom}`

  return (
    <div
      className={classNames(
        styles.constructorPlaceholder,
        'ml-8',
        isBun && positionClassName,
      )}
    >
      <p className="text text_type_main-default text_color_inactive">{tip}</p>
    </div>
  )
}
