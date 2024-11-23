import React, { FC } from 'react'

import classNames from 'classnames'

import { ContentWrapper } from '../content-wrapper/content-wrapper'

import { Nav } from './nav/nav'
import { BurgerLogo } from '../logo/burger-logo'
import { AuthButton } from './auth/auth-button'

import styles from './app-header.module.css'

export const AppHeader: FC = () => (
  <header className={classNames(styles.appHeader, 'p-4')}>
    <ContentWrapper>
      <Nav />
      <BurgerLogo className={styles.headerLogo} />
      <AuthButton />
    </ContentWrapper>
  </header>
)
