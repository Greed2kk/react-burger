import { FC, useCallback } from 'react'
import { useDrop } from 'react-dnd'

import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { ConstructorElement } from '@/components/burger-constructor/constructor-elements/constructor-element/constructor-element'
import { ConstructorPlaceholder } from '@/components/burger-constructor/constructor-elements/constructor-placeholder/constructor-placeholder'
import {
  addIngredient,
  setIngredientsOrder,
} from '@/services/burger-constructor/burger-constructor-slice'
import {
  selectBun,
  selectIngredients,
} from '@/services/burger-constructor/selectors'

import styles from '@/components/burger-constructor/constructor-elements/constructor-elements.module.css'

import { ConstructorElementType } from '@/components/burger-constructor/constructor-elements/constructor-element/types'
import { DndType } from '@/components/burger-Ingredients/ingredients-list/ingredients-items/ingredient-card/types'
import { BurgerIngredient } from '@/services/burger-constructor/types'

export const ConstructorElements: FC = () => {
  const dispatch = useAppDispatch()

  const ingredients = useAppSelector(selectIngredients)
  const bun = useAppSelector(selectBun)

  const handleDrop = useCallback(
    (item: BurgerIngredient): void => {
      const { _id, price, type, imageMobile, name } = item

      dispatch(
        addIngredient({ id: uuidv4(), _id, price, type, imageMobile, name }),
      )
    },
    [dispatch],
  )

  const [, dropTarget] = useDrop({
    accept: [DndType.BUN, DndType.INGREDIENT],
    drop: handleDrop,
  })

  const moveIngredient = (dragIndex: number, hoverIndex: number): void => {
    const updatedIds = [...ingredients.map(ingredient => ingredient.id)]

    const [movedItem] = updatedIds.splice(dragIndex, 1)

    updatedIds.splice(hoverIndex, 0, movedItem)

    dispatch(setIngredientsOrder([bun.id, ...updatedIds, bun.id]))
  }

  return (
    <ul className={styles.constructorElements} ref={dropTarget}>
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

      <ul className={styles.editableConstructorElements}>
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
      </ul>

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
    </ul>
  )
}
