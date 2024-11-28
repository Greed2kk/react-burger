import { FC } from 'react'

import { useAppSelector } from '../app/store/store'

import { makeSelectIngredientById } from '../../services/ingredients/selectors/ingredients'

import { Ingredient } from '../../services/ingredients/types'

import { Modal } from '../modal/modal'

import styles from './ingredient-details.module.css'

interface IngredientEnergyValue
  extends Pick<Ingredient, 'carbohydrates' | 'proteins' | 'fat' | 'calories'> {}

interface IngredientDetailsProps {
  id: Ingredient['_id']
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
  id,
}) => {
  const { name, image_large, calories, proteins, fat, carbohydrates } =
    useAppSelector(makeSelectIngredientById(id))

  const compound: [string, number][] = Object.entries({
    calories,
    proteins,
    fat,
    carbohydrates,
  })

  return (
    <Modal headerText="Детали ингредиента" onCloseHandler={closeModal}>
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
