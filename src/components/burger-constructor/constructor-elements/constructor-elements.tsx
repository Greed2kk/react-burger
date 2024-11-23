import { FC } from 'react'

import {
  Ingredients,
  IngredientType,
} from '../../../services/ingredients/types'

import { ConstructorElement } from './constructor-element/constructor-element'
import { ConstructorElementType } from './constructor-element/types'

import styles from './constructor-elements.module.css'

interface ConstructorElementProps {
  allIngredients: Ingredients[]
}

export const ConstructorElements: FC<ConstructorElementProps> = props => {
  const { allIngredients } = props

  const bun = allIngredients.find(({ type }) => type === IngredientType.BUN)

  const sauces = allIngredients.filter(
    ({ type }) => type === IngredientType.SAUCE,
  )

  const main = allIngredients.filter(({ type }) => type === IngredientType.MAIN)

  return (
    <section className={styles.constructorElements}>
      {bun && (
        <ConstructorElement
          type={ConstructorElementType.TOP}
          isLocked
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      )}
      {/* eslint-disable react/no-array-index-key */}
      <section className={styles.editableConstructorElements}>
        {sauces.map(({ price, image_mobile, name, _id }, index) => (
          <ConstructorElement
            key={`${_id}-${index}`}
            text={name}
            price={price}
            thumbnail={image_mobile}
          />
        ))}
        {main.map(({ price, name, image_mobile, _id }, index) => (
          <ConstructorElement
            key={`${_id}-${index}`}
            text={name}
            price={price}
            thumbnail={image_mobile}
          />
        ))}
      </section>

      {bun && (
        <ConstructorElement
          type={ConstructorElementType.BOTTOM}
          isLocked
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      )}
    </section>
  )
}
