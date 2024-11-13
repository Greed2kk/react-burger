import React from 'react'

import Tabs from '../tabs/tabs'

import { data } from '../../utils/data'
import IngredientsList from './ingredients-list/ingredients-list'

export enum IngredientType {
  BUN = 'bun',
  MAIN = 'main',
  SAUCE = 'sauce',
}

interface Ingreidients {
  _id: string
  name: string
  type: IngredientType
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

class BurgerIngredients extends React.Component<{}, {}> {
  state = { tabs: { activeTab: 'one' } }

  render() {
    const { tabs } = this.state
    const ingredients = data as Ingreidients[]
    const ingredientsListData = ingredients.map(
      ({
        image_large,
        image_mobile,
        calories,
        carbohydrates,
        fat,
        proteins,
        ...rest
      }) => rest
    )

    const ingredientsTabs = [
      { value: 'one', name: 'Булки' },
      { value: 'two', name: 'Соусы' },
      { value: 'three', name: 'Начинки' },
    ]

    const tabClickHandler = (value: string) => {
      this.setState((prevState) => ({
        ...prevState,
        tabs: { activeTab: value },
      }))
    }

    return (
      <section className='mt-10'>
        <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>

        <Tabs
          tabs={ingredientsTabs}
          currentTab={tabs.activeTab}
          tabClickHandler={tabClickHandler}
          className='mb-10'
        />

        <IngredientsList ingredients={ingredientsListData} />
      </section>
    )
  }
}

export default BurgerIngredients
