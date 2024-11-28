import { FC } from 'react'

import { useAppSelector } from '../../app/store/store'

import { selectAllBurgerIngredients } from '../../../services/burger-constructor/burger-constructor-slice'
import { BurgerIngredient } from '../../../services/burger-constructor/types'
import { selectAllIngredients } from '../../../services/ingredients/ingredients-slice'

import { Ingredient, IngredientType } from '../../../services/ingredients/types'

import { ConstructorElement } from './constructor-element/constructor-element'
import { ConstructorElementType } from './constructor-element/types'

import { ConstructorPlaceholder } from './constructor-placeholder/constructor-placeholder'

import styles from './constructor-elements.module.css'

interface BurgerIngredientData extends Ingredient {
  id: BurgerIngredient['id']
}

export const ConstructorElements: FC = () => {
  const burgerIngredientsData: BurgerIngredientData[] = []

  const ingredients = useAppSelector(selectAllIngredients)
  const burgerIngredients = useAppSelector(selectAllBurgerIngredients)

  burgerIngredients.forEach(({ _id, id }) => {
    const ingredient = ingredients.find(item => item['_id'] === _id)

    if (ingredient) {
      burgerIngredientsData.push({ ...ingredient, id: id })
    }
  })

  const bun = burgerIngredientsData.find(
    ({ type }) => type === IngredientType.BUN,
  )

  const notBun = burgerIngredientsData.filter(
    ({ type }) => type !== IngredientType.BUN,
  )

  return (
    <section className={styles.constructorElements}>
      {bun ? (
        <ConstructorElement
          type={ConstructorElementType.TOP}
          isLocked
          _id={bun._id}
          id={bun._id}
          text={`${bun.name} - Верх'`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      ) : (
        <ConstructorPlaceholder isBun isTop />
      )}

      <section className={styles.editableConstructorElements}>
        {!!notBun.length ? (
          notBun.map(({ price, image_mobile, name, id, _id }) => (
            <ConstructorElement
              _id={_id}
              id={id}
              key={id}
              text={name}
              price={price}
              thumbnail={image_mobile}
            />
          ))
        ) : (
          <ConstructorPlaceholder />
        )}
      </section>

      {bun ? (
        <ConstructorElement
          _id={bun._id}
          id={bun._id}
          type={ConstructorElementType.BOTTOM}
          isLocked
          text={`${bun.name} - Низ'`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      ) : (
        <ConstructorPlaceholder isBun />
      )}
    </section>
  )
}
