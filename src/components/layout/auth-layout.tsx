import React, { FC, lazy } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'
import ErrorBoundary from '@/components/error-boundary/error-boundary'

import { useAuth } from '@/utils/hooks'
import { profilePath } from '@/utils/route-paths'

import styles from './auth-layout.module.css'

const AppHeader = lazy(() => import('@/components/app-header/app-header'))

export const AuthLayout: FC = () => {
  const { isAuth } = useAuth()

  if (isAuth) {
    return <Navigate to={profilePath} replace={true} />
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
