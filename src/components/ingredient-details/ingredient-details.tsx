import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { Modal } from '@/components/modal/modal'
import { clearIngredientData } from '@/services/ingredient-details/ingredient-details-slice'
import { getIngredientData } from '@/services/ingredient-details/selectors'

import styles from '@/components/ingredient-details/ingredient-details.module.css'

import type { Ingredient } from '@/services/ingredients/types'

interface IngredientEnergyValue
  extends Pick<Ingredient, 'carbohydrates' | 'proteins' | 'fat' | 'calories'> {}

interface IngredientDetailsProps {
  closeModal: () => void
}

const humanNames: Record<keyof IngredientEnergyValue, string> = {
  calories: 'Калории,ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  closeModal,
}) => {
  const dispatch = useAppDispatch()

  const { calories, proteins, fat, carbohydrates, name, image_large } =
    useAppSelector(getIngredientData)

  const compound: [string, number][] = Object.entries({
    calories,
    proteins,
    fat,
    carbohydrates,
  })

  const onCloseHandler = (): void => {
    closeModal()

    dispatch(clearIngredientData())
  }

  return (
    <Modal headerText="Детали ингредиента" onCloseHandler={onCloseHandler}>
      <img src={image_large} alt={name} className="pl-5 pr-5" />

      <p className="text text_type_main-medium mt-4 mb-8">{name}</p>

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
    </Modal>
  )
}
