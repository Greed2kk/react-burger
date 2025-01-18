import React, { FC, memo } from 'react'

import classNames from 'classnames'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '@/components/burger-Ingredients/burger-ingredients'
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'

import styles from './burger-constructor-page.module.css'

const BurgerConstructorPage: FC = () => (
  <ContentWrapper
    className={classNames(styles.burgerConstructorPage, 'pl-5 pr-5')}
  >
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />

      <BurgerConstructor />
    </DndProvider>
  </ContentWrapper>
)

export default memo(BurgerConstructorPage)
