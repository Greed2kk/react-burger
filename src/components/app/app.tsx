import React, { useEffect, FC, Fragment } from 'react'

import { useSelector } from 'react-redux'

import {
  fetchIngredients,
  getIngredientsError,
  getIngredientsIsLoading,
} from '../../services'

import { selectAllIngredients } from '../../services/ingredients/ingredientsSlice'

import { useAppDispatch } from '../../utils/hooks/useAppDispatch'

import { AppHeader } from '../app-header/app-header'
import BurgerConstructorPage from '../pages/burger-constructor-page/burger-constructor-page'

const App: FC = () => {
  const dispatch = useAppDispatch()

  const ingredients = useSelector(selectAllIngredients)
  const isLoading = useSelector(getIngredientsIsLoading)
  const error = useSelector(getIngredientsError)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  if (isLoading) {
    return null
  }

  if (error) return <h1>{error}</h1>

  return (
    <Fragment>
      <AppHeader />

      {!!ingredients.length && (
        <BurgerConstructorPage ingredients={ingredients} />
      )}
    </Fragment>
  )
}

export default App
