import { FC, Fragment } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/components/app/store/store'
import { Button } from '@/components/button/button'

import { logout } from '@/services/auth/logout'
import { getAuthLoading } from '@/services/auth/selectors'

import { refreshTokenKey } from '@/utils/api/constants'
import { logoutPath } from '@/utils/route-paths'

import styles from './logout.module.css'

const Logout: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoading = useAppSelector(getAuthLoading)

  const token = localStorage.getItem(refreshTokenKey) || ''

  const handleLogout = (): void => {
    dispatch(logout({ token }))
    navigate(logoutPath)
  }

  return (
    <div className={styles.logout}>
      {isLoading ? (
        <p className="text text_type_main-medium">Загрузка...</p>
      ) : (
        <Fragment>
          <p className="text text_type_main-medium">
            Вы уверены что хотите выйти?
          </p>

          <Button onClick={handleLogout}>Да, выйти</Button>
        </Fragment>
      )}
    </div>
  )
}

export default Logout
