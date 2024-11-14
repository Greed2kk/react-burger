import { FC } from 'react'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import { Link } from '../link/link'

interface BurgerLogoProps {
  className?: string
}

export const BurgerLogo: FC<BurgerLogoProps> = (props) => {
  const { className } = props

  return (
    <Link ariaLabel='Обновить стриницу' className={className}>
      <Logo />
    </Link>
  )
}
