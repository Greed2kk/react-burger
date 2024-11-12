import React from 'react'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import Link from '../link/link'

interface BurgerLogoProps {
  className?: string
}

class BurgerLogo extends React.Component<BurgerLogoProps, {}> {
  render() {
    const { className } = this.props

    return (
      <Link ariaLabel='Обновить стриницу' className={className}>
        <Logo />
      </Link>
    )
  }
}

export default BurgerLogo
