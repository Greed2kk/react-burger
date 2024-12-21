import { FC } from 'react'

import classNames from 'classnames'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper'

import { logoutPath, profileOrdersPath, profilePath } from '@/utils/route-paths'

import styles from './profile-page.module.css'

const ProfilePage: FC = () => {
  const location = useLocation()

  const getTip = (): string | null => {
    if (location.pathname === '/profile') {
      return 'В этом разделе вы можете\n изменить свои персональные данные'
    } else if (location.pathname.startsWith('/profile/orders')) {
      return 'В этом разделе вы можете просмотреть свою историю заказов'
    } else {
      return null
    }
  }

  return (
    <ContentWrapper
      as="div"
      className={classNames(styles.profilePage, 'pl-5 pr-5')}
    >
      <section>
        <nav className={styles.navLinks}>
          <NavLink
            to={profilePath}
            end
            className={({ isActive }) =>
              classNames(
                styles.link,
                'text text_type_main-medium text_color_inactive',
                {
                  [styles.active]: isActive,
                },
              )
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={profileOrdersPath}
            className={({ isActive }) =>
              classNames(
                styles.link,
                'text text_type_main-medium text_color_inactive',
                {
                  [styles.active]: isActive,
                },
              )
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to={logoutPath}
            className={({ isActive }) =>
              classNames(
                styles.link,
                'text text_type_main-medium text_color_inactive',
                {
                  [styles.active]: isActive,
                },
              )
            }
          >
            Выход
          </NavLink>
        </nav>

        <p
          className={classNames(
            styles.tip,
            'text text_type_main-default text_color_inactive mt-20',
          )}
        >
          {getTip()}
        </p>
      </section>

      <Outlet />
    </ContentWrapper>
  )
}

export default ProfilePage
