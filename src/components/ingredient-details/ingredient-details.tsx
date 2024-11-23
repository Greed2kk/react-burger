import { FC } from 'react'

import { Ingredients } from '../../services/ingredients/types'

import { Modal } from '../modal/modal'

import styles from './ingredient-details.module.css'

interface IngredientEnergyValue
  extends Pick<
    Ingredients,
    'carbohydrates' | 'proteins' | 'fat' | 'calories'
  > {}

interface IngredientDetailsProps extends Pick<Ingredients, 'name' | 'image'> {
  closeModal: () => void
  energyValue: IngredientEnergyValue
}

const humanNames: Record<keyof IngredientEnergyValue, string> = {
  calories: 'Калории,ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  name,
  image,
  closeModal,
  energyValue,
}) => {
  const compound: [string, number][] = Object.entries(energyValue)

  return (
    <Modal headerText="Детали ингредиента" onCloseHandler={closeModal}>
      <img src={image} alt={name} className="pl-5 pr-5" />
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
