import React, { FC } from 'react'

import classNames from 'classnames'

import { AuthButton } from '@/components/app-header/auth/auth-button'
import { Nav } from '@/components/app-header/nav/nav'
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'
import { BurgerLogo } from '@/components/logo/burger-logo'

import styles from '@/components/app-header/app-header.module.css'

export const AppHeader: FC = () => (
  <header className={classNames(styles.appHeader, 'p-4')}>
    <ContentWrapper>
      <Nav />
      <BurgerLogo className={styles.headerLogo} />
      <AuthButton />
    </ContentWrapper>
  </header>
)
