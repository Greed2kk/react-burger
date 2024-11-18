import { FC, useState } from 'react'

import { Ingredients } from '../pages/burger-constructor-page/types'

import { Tabs } from '../tabs/tabs'

import { IngredientsList } from './ingredients-list/ingredients-list'

interface IngredientsProps {
  ingredients: Ingredients[]
}

export const BurgerIngredients: FC<IngredientsProps> = ({ ingredients }) => {
  const [activeTab, setActive] = useState('first')

  const ingredientsTabs = [
    { value: 'one', name: 'Булки' },
    { value: 'two', name: 'Соусы' },
    { value: 'three', name: 'Начинки' },
  ]

  const tabClickHandler = (value: string) => {
    setActive(value)
  }

  return (
    <section className='mt-10'>
      <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>

      <Tabs
        tabs={ingredientsTabs}
        currentTab={activeTab}
        tabClickHandler={tabClickHandler}
        className='mb-10'
      />

      <IngredientsList ingredients={ingredients} />
    </section>
  )
}
