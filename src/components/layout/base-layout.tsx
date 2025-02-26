import { FC, lazy } from 'react'

import { Outlet } from 'react-router-dom'

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'
import ErrorBoundary from '@/components/error-boundary/error-boundary'

const AppHeader = lazy(() => import('@/components/app-header/app-header'))

export const BaseLayout: FC = () => (
  <ErrorBoundary>
    <AppHeader />
    <ContentWrapper as="main">{<Outlet />}</ContentWrapper>
  </ErrorBoundary>
)

