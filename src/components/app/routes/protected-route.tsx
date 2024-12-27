import React, { FC } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/components/app/store/store'
import { BaseLayout } from '@/components/layout/base-layout'

import { getAuthLoading, getAuthUser } from '@/services/auth/selectors'

import { loginPath } from '@/utils/route-paths'

const ProtectedRoute: FC = () => {
  const user = useAppSelector(getAuthUser)
  const isLoading = useAppSelector(getAuthLoading)

  if (!user && !isLoading) {
    return <Navigate to={loginPath} replace={true} />
  }

  return <BaseLayout />
}

export default ProtectedRoute
