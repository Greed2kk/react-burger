import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '@/pages/layout/layout'

import { rootPath } from './route-paths'

const ProtectedRoute: FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = true

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(rootPath, { replace: true })
    }
  }, [isAuthenticated, navigate])

  return <Layout />
}

export default ProtectedRoute
