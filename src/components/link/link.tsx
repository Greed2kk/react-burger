import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useState,
} from 'react'
import { NavLink } from 'react-router-dom'

import classNames from 'classnames'

import styles from '@/components/link/link.module.css'

interface LinkProps {
  children: ReactNode
  className?: string
  to: string
  ariaLabel?: string
}

export const Link: FC<LinkProps> = props => {
  const { className, children, to, ariaLabel = 'Ссылка' } = props
  const [isActiveLink, setIsActiveLink] = useState(false)

  const modifiedChildren = Children.map(children, child => {
    if (isValidElement(child) && child.type !== 'p' && isActiveLink) {
      // @ts-ignore // REFACTORING
      return cloneElement(child, { type: 'primary' })
    }

    return child
  })

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(styles.link, className, { [styles.active]: isActive })
      }
      aria-label={ariaLabel}
    >
      {({ isActive }) => {
        setIsActiveLink(isActive)

        return modifiedChildren
      }}
    </NavLink>
  )
}
