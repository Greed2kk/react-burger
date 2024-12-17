import { FC, Fragment } from 'react'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { profilePath } from '@/utils/route-paths'

import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './auth-button.module.css'

export const AuthButton: FC = () => (
  <NavLink
    aria-label="Ссылка на личный кабинет"
    className={classNames('pl-5 pr-5 pt-4 pb-4', styles.link)}
    to={profilePath}
  >
    {({ isActive }) => (
      <Fragment>
        <ProfileIcon
          type={isActive ? 'primary' : 'secondary'}
          className="mr-2 ml-5"
        />
        <p
          className={classNames('text text_type_main-default', {
            [styles.active]: isActive,
          })}
        >
          Личный кабинет
        </p>
      </Fragment>
    )}
  </NavLink>
)
