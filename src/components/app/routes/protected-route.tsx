import React, { FC } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/components/app/store/store'
import { BaseLayout } from '@/components/layout/base-layout'

import { getAuthLoading, getIsAuthenticated } from '@/services/auth/selectors'

import { loginPath } from '@/utils/route-paths'

const ProtectedRoute: FC = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const isLoading = useAppSelector(getAuthLoading)

  if (!isAuthenticated && !isLoading) {
    return <Navigate to={loginPath} replace={true} />
  }

  return <BaseLayout />
}

export default ProtectedRoute
