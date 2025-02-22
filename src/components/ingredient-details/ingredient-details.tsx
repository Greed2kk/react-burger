import { FC, Fragment, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'

import {
  addIngredientData,
  clearIngredientData,
} from '@/services/ingredient-details/ingredient-details-slice'
import { getIngredientData } from '@/services/ingredient-details/selectors'
import { getIngredientById } from '@/services/ingredients/selectors'
import type { Ingredient } from '@/services/ingredients/types'

import styles from './ingredient-details.module.css'

interface IngredientEnergyValue
  extends Pick<Ingredient, 'carbohydrates' | 'proteins' | 'fat' | 'calories'> {}

const humanNames: Record<keyof IngredientEnergyValue, string> = {
  calories: 'Калории,ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
}

export const IngredientDetails: FC = () => {
  const dispatch = useAppDispatch()

  const { id = '' } = useParams<{ id: string }>()

  const { calories, proteins, fat, carbohydrates, name, image_large } =
    useAppSelector(getIngredientData)

  const ingredient = useAppSelector(getIngredientById(id))

  useEffect(() => {
    if (ingredient) dispatch(addIngredientData(ingredient))

    return () => {
      dispatch(clearIngredientData())
    }
  }, [dispatch, ingredient])

  const compound: [string, number][] = Object.entries({
    calories,
    proteins,
    fat,
    carbohydrates,
  })

  return (
    <Fragment>
      <img src={image_large} alt={name} className="pl-5 pr-5" />

      <p
        className="text text_type_main-medium mt-4 mb-8"
        data-testid="ingredient-details-name"
      >
        {name}
      </p>

      <div className={styles.energyValue}>
        {compound.map(([key, value]) => (
          <div key={key} className={styles.compound}>
            <p className="text text_type_main-default text_color_inactive">
              {humanNames[key as keyof IngredientEnergyValue]}
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {value}
            </p>
          </div>
        ))}
      </div>
    </Fragment>
  )
}
