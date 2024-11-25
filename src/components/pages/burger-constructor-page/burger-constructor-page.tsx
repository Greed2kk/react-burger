import { FC } from 'react'

import classNames from 'classnames'

import { BurgerConstructor } from '../../burger-constructor/burger-constructor'
import { BurgerIngredients } from '../../burger-Ingredients/burger-ingredients'

import { ContentWrapper } from '../../content-wrapper/content-wrapper'

import styles from './burger-constructor-page.module.css'

const BurgerConstructorPage: FC = () => (
  <ContentWrapper as="main">
    <ContentWrapper
      className={classNames(styles.burgerConstructorPage, 'pl-5 pr-5')}
    >
      <BurgerIngredients />

      <BurgerConstructor />
    </ContentWrapper>
  </ContentWrapper>
)

export default BurgerConstructorPage
