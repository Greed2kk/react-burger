import { FC } from 'react'

import classNames from 'classnames'

import { Ingredients } from '../../../services/ingredients/types'

import { BurgerConstructor } from '../../burger-constructor/burger-constructor'
import { OrderData } from '../../burger-constructor/total-price/types'
import { BurgerIngredients } from '../../burger-Ingredients/burger-ingredients'

import { ContentWrapper } from '../../content-wrapper/content-wrapper'

import { orderData } from '../../../utils/data'

import styles from './burger-constructor-page.module.css'

interface IngredientsData {
  ingredients: Ingredients[]
}

const BurgerConstructorPage: FC<IngredientsData> = ({ ingredients }) => (
  <ContentWrapper as="main">
    <ContentWrapper
      className={classNames(styles.burgerConstructorPage, 'pl-5 pr-5')}
    >
      <BurgerIngredients ingredients={ingredients} />

      <BurgerConstructor {...(orderData as OrderData)} />
    </ContentWrapper>
  </ContentWrapper>
)

export default BurgerConstructorPage
