import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import AppHeader from '@/components/app-header/app-header'
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'
import ErrorBoundary from '@/components/error-boundary/error-boundary'

const Layout: FC = () => (
  <ErrorBoundary>
    <AppHeader />
    <ContentWrapper as="main">{<Outlet />}</ContentWrapper>
  </ErrorBoundary>
)

export default Layout
