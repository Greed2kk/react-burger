import { FC, useEffect, useState } from 'react'

import { useRefContext } from '../../providers/category-ref-provider'

import { useAppDispatch, useAppSelector } from '../app/store/store'

import { fetchIngredients, getIngredientsError } from '../../services'

import { selectAllIngredients } from '../../services/ingredients/ingredients-slice'

import { Tabs } from '../tabs/tabs'

import { IngredientsList } from './ingredients-list/ingredients-list'

const ingredientsRefs = ['bun', 'main', 'sauce']

const ingredientsTabs = [
  { value: 'bun', name: 'Булки' },
  { value: 'sauce', name: 'Соусы' },
  { value: 'main', name: 'Начинки' },
]

export const BurgerIngredients: FC = () => {
  const [activeTab, setActive] = useState<string>('bun')
  const refs = useRefContext()

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

  useEffect(() => {
    if (ingredients.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    }

    const observerCallback: IntersectionObserverCallback = entries => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting)

      if (visibleEntries.length > 0) {
        const mostVisible = visibleEntries.reduce((max, entry) =>
          entry.intersectionRatio > max.intersectionRatio ? entry : max,
        )

        const index = refs.findIndex(ref => ref.current === mostVisible.target)


        setActive(ingredientsRefs[index])
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current)
      })

      observer.disconnect()
    }
  })

  if (error) {
    return <h1>{error}</h1>
  }

  const tabClickHandler = (value: string): void => {
    setActive(value)

    const [bunRef, mainRef, sauceRef] = refs

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
