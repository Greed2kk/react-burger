import classNames from 'classnames'
import { Component } from 'react'
import BurgerConstructor from '../../burger-constructor/burger-constructor'

import ContentWrapper from '../../content-wrapper/content-wrapper'

import styles from './burger-constructor-page.module.css'
import BurgerIngredients from '../../burger-Ingredients/burger-ingredients'

class BurgerConstructorPage extends Component {
  render() {
    return (
      <ContentWrapper as='main'>
        <ContentWrapper
          className={classNames(styles.burgerConstructorPage, 'pl-5 pr-5')}
        >
          <BurgerIngredients />

          <BurgerConstructor />
        </ContentWrapper>
      </ContentWrapper>
    )
  }
}

export default BurgerConstructorPage
