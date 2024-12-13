import { FC } from 'react'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import { Link } from '@/components/link/link'

interface BurgerLogoProps {
  className?: string
}

export const BurgerLogo: FC<BurgerLogoProps> = props => {
  const { className } = props

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link ariaLabel="Обновить стриницу" className={className}>
      <Logo />
    </Link>
  )
}
