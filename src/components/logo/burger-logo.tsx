import { FC } from 'react'

import { rootPath } from '@/utils/route-paths'

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

interface BurgerLogoProps {
  className?: string
}

export const BurgerLogo: FC<BurgerLogoProps> = props => {
  const { className } = props

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a aria-label="Обновить стриницу" className={className} href={rootPath}>
      <Logo />
    </a>
  )
}
