import React, { FC, lazy } from 'react'

import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '@/components/app/store/store'
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'
import ErrorBoundary from '@/components/error-boundary/error-boundary'

import { getIsAuthenticated } from '@/services/auth/selectors'

import { rootPath } from '@/utils/route-paths'

import styles from './auth-layout.module.css'

const AppHeader = lazy(() => import('@/components/app-header/app-header'))

export const AuthLayout: FC = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const location = useLocation()

  if (isAuthenticated) {
    return (
      <Navigate
        to={rootPath}
        replace={true}
        state={{ from: location.pathname }}
      />
    )
  }

  return (
    <ErrorBoundary>
      <AppHeader />

      <ContentWrapper as="main" className={styles.authLayout}>
        {<Outlet />}
      </ContentWrapper>
    </ErrorBoundary>
  )
}
