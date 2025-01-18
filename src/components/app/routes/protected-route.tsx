import React, { FC } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from '@/components/app/store/store'
import { BaseLayout } from '@/components/layout/base-layout'

import { getIsAuthenticated } from '@/services/auth/selectors'

import { loginPath } from '@/utils/route-paths'

const ProtectedRoute: FC = () => {
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate to={loginPath} replace state={{ from: location.pathname }} />
    )
  }

  return <BaseLayout />
}

export default ProtectedRoute
