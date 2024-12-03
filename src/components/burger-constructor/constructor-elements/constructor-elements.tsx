import { FC, useCallback } from 'react'

import { useDrop } from 'react-dnd'

import { v4 as uuidv4 } from 'uuid'

import {
  addIngredient,
  selectAllBurgerIngredients,
  setIngredientsOrder,
} from '../../../services/burger-constructor/burger-constructor-slice'

import {
  selectBun,
  selectIngredients,
} from '../../../services/burger-constructor/selectors/selectors'
import { BurgerIngredient } from '../../../services/burger-constructor/types'
import {
  decreaseQuantity,
  increaseQuantity,
} from '../../../services/ingredients/ingredient-slice'
import { IngredientType } from '../../../services/ingredients/types'

import { useAppDispatch, useAppSelector } from '../../app/store/store'

import { DndType } from '../../burger-Ingredients/ingredients-list/ingredients-items/ingredient-card/types'

import { ConstructorElement } from './constructor-element/constructor-element'
import { ConstructorElementType } from './constructor-element/types'

import styles from './constructor-elements.module.css'

import { ConstructorPlaceholder } from './constructor-placeholder/constructor-placeholder'

export const ConstructorElements: FC = () => {
  const dispatch = useAppDispatch()

  const ingredients = useAppSelector(selectIngredients)
  const bun = useAppSelector(selectBun)
  const allIngredients = useAppSelector(selectAllBurgerIngredients)

  const handleDrop = useCallback(
    (item: BurgerIngredient): void => {
      const { _id, price, type, imageMobile, name } = item

      dispatch(
        addIngredient({ id: uuidv4(), _id, price, type, imageMobile, name }),
      )
      if (bun && type === IngredientType.BUN) {
        dispatch(decreaseQuantity({ _id: bun._id }))
      }

      dispatch(increaseQuantity({ _id }))
    },
    [bun, dispatch],
  )

  const [, dropTarget] = useDrop({
    accept: [DndType.BUN, DndType.INGREDIENT],
    drop: handleDrop,
  })

  const moveIngredient = (dragIndex: number, hoverIndex: number): void => {
    const updatedIds = [...allIngredients.map(ingredient => ingredient.id)]

    const [movedItem] = updatedIds.splice(dragIndex, 1)

    updatedIds.splice(hoverIndex, 0, movedItem)

    dispatch(setIngredientsOrder(updatedIds))
  }

  return (
    <section className={styles.constructorElements} ref={dropTarget}>
      {bun ? (
        <ConstructorElement
          type={ConstructorElementType.TOP}
          isLocked
          _id={bun._id}
          id={bun._id}
          text={`${bun.name} - Верх'`}
          price={bun.price}
          thumbnail={bun.imageMobile}
        />
      ) : (
        <ConstructorPlaceholder isBun isTop />
      )}

      <section className={styles.editableConstructorElements}>
        {!!ingredients.length ? (
          ingredients.map(({ price, imageMobile, name, id, _id }, index) => (
            <ConstructorElement
              _id={_id}
              index={index}
              id={id}
              key={id}
              text={name}
              price={price}
              thumbnail={imageMobile}
              moveIngredient={moveIngredient}
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
          thumbnail={bun.imageMobile}
        />
      ) : (
        <ConstructorPlaceholder isBun />
      )}
    </section>
  )
}
