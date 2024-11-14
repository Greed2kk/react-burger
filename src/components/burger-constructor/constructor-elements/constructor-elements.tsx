import React from 'react'

import {
  Ingredients,
  IngredientType,
} from '../../pages/burger-constructor-page/types'

import ConstructorElement, {
  ConstructorElementType,
} from './constructor-element/constructor-element'

import styles from './constructor-elements.module.css'

interface ConstructorElementProps {
  allIngredients: Ingredients[]
}

class ConstructorElements extends React.Component<ConstructorElementProps, {}> {
  render() {
    const { allIngredients } = this.props

    const bun = allIngredients.find(({ type }) => type === IngredientType.BUN)

    const sauces = allIngredients.filter(
      ({ type }) => type === IngredientType.SAUCE
    )

    const main = allIngredients.filter(
      ({ type }) => type === IngredientType.MAIN
    )

    return (
      <section className={styles.constructorElements}>
        {bun && (
          <ConstructorElement
            type={ConstructorElementType.TOP}
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}

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
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}
      </section>
    )
  }
}

export default ConstructorElements
