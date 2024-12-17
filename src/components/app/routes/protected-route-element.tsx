import React, { FC } from 'react'

import { Navigate } from 'react-router-dom'

import { BaseLayout } from '@/components/layout/base-layout'

import { useAuth } from '@/utils/hooks'
import { loginPath } from '@/utils/route-paths'

const ProtectedRouteElement: FC = () => {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to={loginPath} replace={true} />
  }

  return <BaseLayout />
}

export default ProtectedRouteElement
