import React from 'react'
import { Ingredients } from '../pages/burger-constructor-page/types'

import Tabs from '../tabs/tabs'

import IngredientsList from './ingredients-list/ingredients-list'

interface IngredientsProps {
  ingredients: Ingredients[]
}

interface IngredientsState {
  tabs: { activeTab: string }
}

class BurgerIngredients extends React.Component<
  IngredientsProps,
  IngredientsState
> {
  state = { tabs: { activeTab: 'one' } }

  render() {
    const { ingredients } = this.props
    const { tabs } = this.state

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
