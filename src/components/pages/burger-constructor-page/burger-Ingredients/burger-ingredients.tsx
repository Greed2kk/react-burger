import React from 'react'

import Tabs from '../../../tabs/tabs'

class BurgerIngredients extends React.Component<{}, {}> {
  state = { tabs: { activeTab: 'one' } }

  render() {
    const { tabs } = this.state

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
        />
      </section>
    )
  }
}

export default BurgerIngredients
