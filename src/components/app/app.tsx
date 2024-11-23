import { useEffect, useState, Fragment, FC } from 'react'

import { AppHeader } from '../app-header/app-header'

import BurgerConstructorPage from '../pages/burger-constructor-page/burger-constructor-page'

import { Ingredients } from '../pages/burger-constructor-page/types'

import { fetchApi } from '../../utils/helpers/fetch-api'

import { ingredientsSlug } from '../../utils/constants'

const App: FC = () => {
  const [ingredients, setIngredients] = useState<Ingredients[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const getIngredientsData = async (): Promise<void> => {
      try {
        const data = await fetchApi<Ingredients[]>(ingredientsSlug)

        setIngredients(data)
      } catch (e) {
        if (e instanceof Error) {
          /* eslint-disable-next-line */
          console.error(e.message)
          setError('Не удалось загрузить данные ингредиентов')
        }
      } finally {
        setIsLoading(false)
      }
    }

    void getIngredientsData()
  }, [])

  return (
    <Fragment>
      <AppHeader />
      {error && <h1>{error}</h1>}

      {!isLoading && !!ingredients && !error && (
        <BurgerConstructorPage ingredients={ingredients} />
      )}
    </Fragment>
  )
}

export default App
