import { FC, UIEvent, useCallback, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../app/store/store'

import { useSectionsRefContext } from '../../providers/category-ref-provider'

import { Tabs } from '../tabs/tabs'

import { fetchIngredients } from '../../services/ingredients/fetch-ingredients'

import {
  getIngredients,
  getIngredientsError,
} from '../../services/ingredients/selectors'

import { throttle } from '../../utils/helpers/throttle'

import { IngredientsList } from './ingredients-list/ingredients-list'

import { IngredientType } from '../../services/ingredients/types'
import type { TabsOptions } from '../tabs/tabs'

export const BurgerIngredients: FC = () => {
  const [activeTab, setActive] = useState(IngredientType.BUN)
  const sectionsRefs = useSectionsRefContext()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  const ingredients = useAppSelector(getIngredients)

  const error = useAppSelector(getIngredientsError)

  const ingredientsTabs: TabsOptions[] = [
    { value: Object.keys(sectionsRefs)[0], name: 'Булки' },
    { value: Object.keys(sectionsRefs)[1], name: 'Начинки' },
    { value: Object.keys(sectionsRefs)[2], name: 'Соусы' },
  ]

  const handleScroll = useCallback(
    (e: UIEvent<HTMLElement>): void => {
      const container = e.currentTarget

      if (!container) return

      const containerRect = container.getBoundingClientRect()

      let mostVisibleSection: string | null = null
      let maxVisibleHeight = 0

      Object.entries(sectionsRefs).forEach(([key, ref]) => {
        const section = ref.current

        if (!section) return

        const sectionRect = section.getBoundingClientRect()
        const visibleHeight = Math.max(
          0,
          Math.min(containerRect.bottom, sectionRect.bottom) -
            Math.max(containerRect.top, sectionRect.top),
        )

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight
          mostVisibleSection = key
        }
      })

      if (mostVisibleSection) {
        setActive(mostVisibleSection as IngredientType)
      }
    },
    [sectionsRefs],
  )

  const throttledHandleScroll = throttle(handleScroll, 200)

  if (error) {
    return <h1>{error}</h1>
  }

  const tabClickHandler = (section: string): void => {
    setActive(section as IngredientType)

    sectionsRefs[section as IngredientType]?.current?.scrollIntoView()
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

      <IngredientsList
        ingredients={ingredients}
        handleScroll={throttledHandleScroll}
      />
    </section>
  )
}
