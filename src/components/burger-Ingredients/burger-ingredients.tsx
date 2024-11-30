import { FC, useEffect, useState } from 'react'
import { useRefContext } from '../../providers/category-ref-provider'

import { useAppDispatch, useAppSelector } from '../app/store/store'

import { fetchIngredients, getIngredientsError } from '../../services'

import { selectAllIngredients } from '../../services/ingredients/ingredients-slice'

import { Tabs } from '../tabs/tabs'

import { IngredientsList } from './ingredients-list/ingredients-list'

export const BurgerIngredients: FC = () => {
  const [activeTab, setActive] = useState('bun')
  const { bunRef, mainRef, sauceRef } = useRefContext()

  const ingredientsTabs = [
    { value: 'bun', name: 'Булки' },
    { value: 'sauce', name: 'Соусы' },
    { value: 'main', name: 'Начинки' },
  ]

  const dispatch = useAppDispatch()

  const ingredients = useAppSelector(selectAllIngredients)
  const error = useAppSelector(getIngredientsError)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    dispatch(fetchIngredients({ signal }))

    return () => {
      controller.abort()
    }
  }, [dispatch])

  if (error) {
    return <h1>{error}</h1>
  }

  const tabClickHandler = (value: string): void => {
    setActive(value)

    switch (value) {
      case 'bun':
        return bunRef?.current?.scrollIntoView()
      case 'sauce':
        return sauceRef?.current?.scrollIntoView()
      case 'main':
        return mainRef?.current?.scrollIntoView()
    }
  }

  return (
    <section className="mt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

      <Tabs
        tabs={ingredientsTabs}
        currentTab={activeTab}
        tabClickHandler={tabClickHandler}
        className="mb-10"
      />

      <IngredientsList ingredients={ingredients} />
    </section>
  )
}
