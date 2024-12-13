import { FC, memo } from 'react'

import classNames from 'classnames'

import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '@/components/burger-Ingredients/burger-ingredients'
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'

import styles from '@/pages/burger-constructor-page/burger-constructor-page.module.css'

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

export default memo(BurgerConstructorPage)
