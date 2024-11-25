import { FC, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import {
  fetchIngredients,
  getIngredientsError,
  getIngredientsIsLoading,
} from '../../services'

import { selectAllIngredients } from '../../services/ingredients/ingredientsSlice'

import { useAppDispatch } from '../../utils/hooks/useAppDispatch'

import { Tabs } from '../tabs/tabs'

import { IngredientsList } from './ingredients-list/ingredients-list'

export const BurgerIngredients: FC = () => {
  const [activeTab, setActive] = useState('first')

  const ingredientsTabs = [
    { value: 'one', name: 'Булки' },
    { value: 'two', name: 'Соусы' },
    { value: 'three', name: 'Начинки' },
  ]

  const dispatch = useAppDispatch()

  const ingredients = useSelector(selectAllIngredients)
  const isLoading = useSelector(getIngredientsIsLoading)
  const error = useSelector(getIngredientsError)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    dispatch(fetchIngredients({ signal }))

    return () => {
      controller.abort()
    }
  }, [dispatch])

  if (isLoading) {
    return null
  }

  if (error) {
    return <h1>{error}</h1>
  }

  const tabClickHandler = (value: string): void => {
    setActive(value)
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
