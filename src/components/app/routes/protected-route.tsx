import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '@/pages/layout/layout'
import { useAuth } from '@/utils/hooks'
import { loginPath } from '@/utils/route-paths'

const ProtectedRoute: FC = () => {
  const navigate = useNavigate()

  const { isAuth } = useAuth()

  useEffect(() => {
    if (!isAuth) {
      navigate(loginPath, { replace: true })
    }
  }, [isAuth, navigate])

  return <Layout />
}

export default ProtectedRoute
