import { FC, useEffect } from 'react'

import { useSelector } from 'react-redux'

import classNames from 'classnames'

import {
  fetchIngredients,
  getIngredientsError,
  getIngredientsIsLoading,
} from '../../../services'

import { selectAllIngredients } from '../../../services/ingredients/ingredientsSlice'

import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'

import { BurgerConstructor } from '../../burger-constructor/burger-constructor'
import { OrderData } from '../../burger-constructor/total-price/types'
import { BurgerIngredients } from '../../burger-Ingredients/burger-ingredients'

import { ContentWrapper } from '../../content-wrapper/content-wrapper'

import { orderData } from '../../../utils/data'

import styles from './burger-constructor-page.module.css'

const BurgerConstructorPage: FC = () => {
  const dispatch = useAppDispatch()

  const ingredients = useSelector(selectAllIngredients)
  const isLoading = useSelector(getIngredientsIsLoading)
  const error = useSelector(getIngredientsError)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    dispatch(fetchIngredients({ signal }))

    return () => {
      controller.abort()
    }
  }, [dispatch])

  if (isLoading) {
    return null
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <ContentWrapper as="main">
      <ContentWrapper
        className={classNames(styles.burgerConstructorPage, 'pl-5 pr-5')}
      >
        <BurgerIngredients ingredients={ingredients} />

        <BurgerConstructor {...(orderData as OrderData)} />
      </ContentWrapper>
    </ContentWrapper>
  )
}

export default BurgerConstructorPage
