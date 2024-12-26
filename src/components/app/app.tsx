import React, { FC, useEffect } from 'react'

import Routes from '@/components/app/routes/routes'
import { useAppDispatch } from '@/components/app/store/store'

import { setAccessToken, setRefreshToken } from '@/services/auth/auth-slice'

import { accessTokenKey, refreshTokenKey } from '@/utils/api/constants'

const App: FC = () => {
  const dispatch = useAppDispatch()

  const accessToken = localStorage.getItem(accessTokenKey)
  const refreshToken = localStorage.getItem(refreshTokenKey)

  useEffect(() => {
    if (accessToken && refreshToken) {
      dispatch(setAccessToken({ accessToken }))
      dispatch(setRefreshToken({ refreshToken }))
    }
  }, [accessToken, dispatch, refreshToken])

  return <Routes />
}

export default App
