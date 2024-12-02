import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  useContext,
  useMemo,
  useRef,
} from 'react'

type CategoryRefs = [
  bunRef: RefObject<HTMLElement>,
  mainRef: RefObject<HTMLElement>,
  sauceRef: RefObject<HTMLElement>,
]

const CategoryRefContext = createContext<CategoryRefs | null>(null)

export const CategoryRefProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const bunRef = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const sauceRef = useRef<HTMLElement>(null)

  const value = useMemo<CategoryRefs>(
    () => [bunRef, mainRef, sauceRef],
    [bunRef, sauceRef, mainRef],
  )

  return (
    <CategoryRefContext.Provider value={value}>
      {children}
    </CategoryRefContext.Provider>
  )
}

export const useRefContext = (): [
  bunRef: RefObject<HTMLElement>,
  mainRef: RefObject<HTMLElement>,
  sauceRef: RefObject<HTMLElement>,
] => {
  const context = useContext(CategoryRefContext)

  if (!context) {
    throw new Error('useRefContext must be used within a CategoryRefProvider')
  }

  return context
}
