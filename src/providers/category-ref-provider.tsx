import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  useContext,
  useMemo,
  useRef,
} from 'react'

const CategoryRefContext = createContext<{
  bunRef: RefObject<HTMLElement> | null
  sauceRef: RefObject<HTMLElement> | null
  mainRef: RefObject<HTMLElement> | null
}>({ bunRef: null, sauceRef: null, mainRef: null })

export const CategoryRefProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const bunRef = useRef<HTMLElement>(null)
  const sauceRef = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLElement>(null)

  const value = useMemo(
    () => ({ bunRef, sauceRef, mainRef }),
    [bunRef, sauceRef, mainRef],
  )

  return (
    <CategoryRefContext.Provider value={value}>
      {children}
    </CategoryRefContext.Provider>
  )
}

export const useRefContext = (): {
  bunRef: RefObject<HTMLElement> | null
  sauceRef: RefObject<HTMLElement> | null
  mainRef: RefObject<HTMLElement> | null
} => useContext(CategoryRefContext)
