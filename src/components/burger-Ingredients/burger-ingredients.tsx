import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { useSectionsRefContext } from '../../providers/category-ref-provider'
import { getIngredients } from '../../services/ingredients/selectors/ingredients'
import { IngredientType } from '../../services/ingredients/types'
import { throttle } from '../../utils/helpers/throttle'

import { useAppDispatch, useAppSelector } from '../app/store/store'

import { fetchIngredients, getIngredientsError } from '../../services'

import { Tabs, TabsOptions } from '../tabs/tabs'

import { IngredientsList } from './ingredients-list/ingredients-list'

export const BurgerIngredients: FC = () => {
  const [activeTab, setActive] = useState(IngredientType.BUN)
  const sectionsRefs = useSectionsRefContext()
  const containerRef = useRef<HTMLElement>(null)

  const ingredientsTabs: TabsOptions[] = [
    { value: Object.keys(sectionsRefs)[0], name: 'Булки' },
    { value: Object.keys(sectionsRefs)[1], name: 'Начинки' },
    { value: Object.keys(sectionsRefs)[2], name: 'Соусы' },
  ]

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  const ingredients = useAppSelector(getIngredients)

  const error = useAppSelector(getIngredientsError)

  const handleScroll = useCallback((): void => {
    console.log('call')
    const container = containerRef.current

    if (!container) return

    const offsets = Object.entries(sectionsRefs).map(([key, ref]) => {
      const sectionRef = ref.current

      if (!sectionRef) return { key, offset: Infinity }

      const rect = sectionRef.getBoundingClientRect()

      return {
        key,
        offset: Math.abs(rect.top - container.getBoundingClientRect().top),
      }
    })

    const validOffsets = offsets.filter(offset => offset !== undefined)

    if (validOffsets.length > 0) {
      const closestSection = validOffsets.reduce((prev, curr) =>
        prev.offset < curr.offset ? prev : curr,
      ).key as IngredientType

      setActive(closestSection)
    }
  }, [sectionsRefs])

  const throttledHandleScroll = throttle(handleScroll, 200)

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      container.addEventListener('scroll', throttledHandleScroll)

      return () => {
        container.removeEventListener('scroll', throttledHandleScroll)
      }
    }

    return () => {}
  }, [throttledHandleScroll])

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

      <IngredientsList ingredients={ingredients} ref={containerRef} />
    </section>
  )
}
