import React from 'react'

import classNames from 'classnames'

import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import Link from '../../link/link'

import styles from '../nav/nav.module.css'

class AuthButton extends React.Component<{}, {}> {
  render() {
    return (
      <Link
        ariaLabel='Ссылка на личный кабинет'
        className='pl-5 pr-5 pt-4 pb-4'
      >
        <ProfileIcon type='secondary' className='mr-2 ml-5' />
        <p
          className={classNames('text text_type_main-default', {
            [styles.inactive]: true, // refactor
          })}
        >
          Личный кабинет
        </p>
      </Link>
    )
  }
}

export default AuthButton
