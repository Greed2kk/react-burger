import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  useContext,
  useMemo,
  useRef,
} from 'react'

import { IngredientType } from '../services/ingredients/types'

export type RefCategory = RefObject<HTMLDivElement>

type CategoryRefsContextType = Record<IngredientType, RefCategory>

const CategoryRefContext = createContext<CategoryRefsContextType | null>(null)

export const CategoryRefProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const bunRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const sauceRef = useRef<HTMLDivElement>(null)

  const categoryRefs = useMemo(
    () => ({
      [IngredientType.BUN]: bunRef,
      [IngredientType.MAIN]: mainRef,
      [IngredientType.SAUCE]: sauceRef,
    }),
    [],
  )

  return (
    <CategoryRefContext.Provider value={categoryRefs}>
      {children}
    </CategoryRefContext.Provider>
  )
}

export const useSectionsRefContext = (): {
  bun: RefObject<HTMLDivElement>
  main: RefObject<HTMLDivElement>
  sauce: RefObject<HTMLDivElement>
} => {
  const context = useContext(CategoryRefContext)

  if (!context) {
    throw new Error('useSectionsRefContext must be used within a CategoryRefProvider')
  }

  return {
    [IngredientType.BUN]: context[IngredientType.BUN],
    [IngredientType.MAIN]: context[IngredientType.MAIN],
    [IngredientType.SAUCE]: context[IngredientType.SAUCE],
  }
}
