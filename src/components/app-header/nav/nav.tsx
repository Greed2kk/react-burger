import { FC, Fragment } from 'react'

import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { ordersPath, rootPath } from '@/utils/route-paths'

import {
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './nav.module.css'

export const Nav: FC = () => (
  <nav className={classNames(styles.nav)}>
    <NavLink
      aria-label="Страница Конструктора"
      className={classNames(styles.link, 'mr-2 pl-5 pr-5 pt-4 pb-4')}
      to={rootPath}
    >
      {({ isActive }) => (
        <Fragment>
          <BurgerIcon
            type={isActive ? 'primary' : 'secondary'}
            className="mr-2"
          />
          <p
            className={classNames('text text_type_main-default', {
              [styles.active]: isActive,
            })}
          >
            Конструктор
          </p>
        </Fragment>
      )}
    </NavLink>

    <NavLink
      aria-label="Страница Ленты заказов"
      className={classNames(styles.link, 'pl-5 pr-5 pt-4 pb-4')}
      to={ordersPath}
    >
      {({ isActive }) => (
        <Fragment>
          <ListIcon
            type={isActive ? 'primary' : 'secondary'}
            className="mr-2"
          />
          <p
            className={classNames('text text_type_main-default', {
              [styles.active]: isActive,
            })}
          >
            Лента заказов
          </p>
        </Fragment>
      )}
    </NavLink>
  </nav>
)
