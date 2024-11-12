import classNames from 'classnames'
import React from 'react'

import {
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './nav.module.css'

import Link from '../../link/link'

class Nav extends React.Component<{}, {}> {
  render() {
    return (
      <nav className={classNames(styles.nav)}>
        <Link
          ariaLabel='Страница Конструктора'
          className={classNames(styles.linkItem, 'mr-2 pl-5 pr-5 pt-4 pb-4')}
        >
          <BurgerIcon type='primary' className={classNames('mr-2')} />
          <p
            className={classNames('text text_type_main-default', {
              [styles.active]: true,  // refactor
            })}
          >
            Конструктор
          </p>
        </Link>

        <Link
          ariaLabel='Страница Ленты заказов'
          className={classNames(styles.linkItem, 'pl-5 pr-5 pt-4 pb-4')}
        >
          <ListIcon
            className={classNames('mr-2')}
            type='secondary' // refactor
          />
          <p
            className={classNames('text text_type_main-default', {
              [styles.inactive]: true,  // refactor
            })}
          >
            Лента заказов
          </p>
        </Link>
      </nav>
    )
  }
}

export default Nav
