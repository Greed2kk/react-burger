import React from 'react'

import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import Link from '../../link/link'

class AuthButton extends React.Component<{}, {}> {
  render() {
    return (
      <Link
        ariaLabel='Ссылка на личный кабинет'
        className='pl-5 pr-5 pt-4 pb-4'
      >
        <ProfileIcon type='primary' className='mr-2 ml-5' />
        <p className='text text_type_main-default'>Личный кабинет</p>
      </Link>
    )
  }
}

export default AuthButton
