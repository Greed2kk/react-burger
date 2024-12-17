import { FC } from 'react'

import classNames from 'classnames'

import { Link } from '@/components/link/link'

import { ordersPath, rootPath } from '@/utils/route-paths'

import {
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './nav.module.css'

export const Nav: FC = () => (
  <nav className={classNames(styles.nav)}>
    <Link
      ariaLabel="Страница Конструктора"
      className={classNames(styles.linkItem, 'mr-2 pl-5 pr-5 pt-4 pb-4')}
      to={rootPath}
    >
      <BurgerIcon type="secondary" className={classNames('mr-2')} />
      <p className="text text_type_main-default">Конструктор</p>
    </Link>

    <Link
      ariaLabel="Страница Ленты заказов"
      className={classNames(styles.linkItem, 'pl-5 pr-5 pt-4 pb-4')}
      to={ordersPath}
    >
      <ListIcon className={classNames('mr-2')} type="secondary" />
      <p className="text text_type_main-default">Лента заказов</p>
    </Link>
  </nav>
)
