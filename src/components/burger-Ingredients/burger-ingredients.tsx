import { FC, useCallback, useEffect, useState } from 'react'

import { fetchIngredients } from '../../services/ingredients/fetch-ingredients'

import {
  getIngredients,
  getIngredientsError,
  getIngredientsIsLoading,
} from '../../services/ingredients/selectors'

import { IngredientType } from '../../services/ingredients/types'

import { useAppDispatch, useAppSelector } from '../app/store/store'

import type { TabsOptions } from '../tabs/tabs'
import { Tabs } from '../tabs/tabs'

import { IngredientsList } from './ingredients-list/ingredients-list'

const ingredientsOrder = ['bun', 'sauce', 'main']

export const BurgerIngredients: FC = () => {
  const [activeTab, setActive] = useState(IngredientType.BUN)
  const [categoriesInView, setCategoriesInView] = useState<IngredientType[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  const ingredients = useAppSelector(getIngredients)

  const error = useAppSelector(getIngredientsError)
  const isLoading = useAppSelector(getIngredientsIsLoading)

  const ingredientsTabs: TabsOptions[] = [
    { value: IngredientType.BUN, name: 'Булки' },
    { value: IngredientType.SAUCE, name: 'Соусы' },
    { value: IngredientType.MAIN, name: 'Начинки' },
  ]

  const setActiveTab = useCallback(
    (category: IngredientType, inView: boolean): void => {
      setCategoriesInView(prev => {
        if (inView && !prev.includes(category)) {
          return [...prev, category]
        }

        if (!inView) {
          return [...prev].filter(cure => cure !== category)
        }

        return prev
      })
    },
    [],
  )

  useEffect(() => {
    if (categoriesInView.length > 0) {
      setActive(
        categoriesInView.sort(
          (a, b) => ingredientsOrder.indexOf(a) - ingredientsOrder.indexOf(b),
        )[0],
      )
    }
  }, [categoriesInView, categoriesInView.length])

  const onTabClick = (tabName: string): void => {
    setActive(tabName as IngredientType)
    const categoryEl = document.getElementById(tabName)

    categoryEl && categoryEl.scrollIntoView()
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <section className="mt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

      <Tabs tabs={ingredientsTabs} currentTab={activeTab} className="mb-10" tabClickHandler={onTabClick}/>

      {!isLoading ? (
        <IngredientsList
          ingredients={ingredients}
          setActiveTab={setActiveTab}
        />
      ) : (
        <h1>Загрузка...</h1>
      )}
    </section>
  )
}
