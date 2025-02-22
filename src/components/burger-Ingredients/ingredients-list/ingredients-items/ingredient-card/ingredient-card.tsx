import { FC, Fragment, useMemo } from 'react'

import classNames from 'classnames'
import { useDrag } from 'react-dnd'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/components/app/store/store'
import { DndType } from '@/components/burger-Ingredients/ingredients-list/ingredients-items/ingredient-card/types'

import {
  selectBunId,
  selectIngredientsIds,
} from '@/services/burger-constructor/selectors'
import { type Ingredient, IngredientType } from '@/services/ingredients/types'

import { ingredientsPath } from '@/utils/route-paths'

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './ingredient-card.module.css'

interface IngredientItemProps {
  ingredient: Ingredient
}

export const IngredientCard: FC<IngredientItemProps> = ({ ingredient }) => {
  const { image, name, price, _id, type, image_mobile } = ingredient
  const navigate = useNavigate()
  const location = useLocation()

  const ingredientsIds = useAppSelector(selectIngredientsIds)
  const bunId = useAppSelector(selectBunId)

  const count = useMemo(() => {
    if (type === IngredientType.BUN && bunId === _id) {
      return 2
    }

    if (type !== IngredientType.BUN && ingredientsIds.length) {
      return ingredientsIds.filter(id => id === _id).length
    }

    return null
  }, [_id, bunId, ingredientsIds, type])

  const [{ isDrag }, dragRef] = useDrag(() => ({
    type: type === IngredientType.BUN ? DndType.BUN : DndType.INGREDIENT,
    item: {
      _id,
      price,
      type,
      name,
      imageMobile: image_mobile,
    },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const handleDetailsClick = (): void => {
    navigate(`${ingredientsPath}/${_id}`, {
      state: { backgroundLocation: location },
    })
  }

  return (
    <Fragment>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <li
        ref={dragRef}
        className={classNames(styles.ingredientCard, { [styles.drag]: isDrag })}
        onClick={handleDetailsClick}
        draggable
        data-testid="ingredient"
      >
        <div className={classNames(styles.imageContainer, 'mb-1 pl-4 pr-4')}>
          <img src={image} alt={image} />

          {count ? (
            <Counter count={count} size="default" extraClass={styles.counter} />
          ) : null}
        </div>

        <span className={classNames(styles.price, 'mb-1')}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </span>

        <p
          className={classNames(styles.name, 'text text_type_main-small mt-2')}
        >
          {name}
        </p>
      </li>
    </Fragment>
  )
}
