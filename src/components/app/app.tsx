import { useEffect, useState } from 'react'

import { AppHeader } from '../app-header/app-header'

import BurgerConstructorPage from '../pages/burger-constructor-page/burger-constructor-page'

import { Ingredients } from '../pages/burger-constructor-page/types'

import { baseApiUrl, ingredientsApi } from '../../utils/constants'

function App() {
  const [ingredients, setIngredients] = useState<Ingredients[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const getIngredientsData = async () => {
      try {
        const response = await fetch(`${baseApiUrl}/${ingredientsApi}`)

        const { data } = await response.json()

        setIngredients(data)
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
          setError('Не удалось загрузить данные ингредиентов!')
        }
      } finally {
        setIsLoading(false)
      }
    }

    void getIngredientsData()
  }, [])

  return (
    <>
      <AppHeader />
      {error && <h1>{error}</h1>}

      {!isLoading && !!ingredients && !error && (
        <BurgerConstructorPage ingredients={ingredients} />
      )}
    </>
  )
}

export default App
