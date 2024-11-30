import { FC, memo } from 'react'

import classNames from 'classnames'

import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '../../components/burger-Ingredients/burger-ingredients'

import { ContentWrapper } from '../../components/content-wrapper/content-wrapper'
import { CategoryRefProvider } from '../../providers/category-ref-provider'

import styles from './burger-constructor-page.module.css'

const BurgerConstructorPage: FC = () => (
  <ContentWrapper as="main">
    <ContentWrapper
      className={classNames(styles.burgerConstructorPage, 'pl-5 pr-5')}
    >
      <CategoryRefProvider>
        <BurgerIngredients />
      </CategoryRefProvider>

      <BurgerConstructor />
    </ContentWrapper>
  </ContentWrapper>
)

export default memo(BurgerConstructorPage)
