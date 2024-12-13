import { FC, ReactNode } from 'react'

import classNames from 'classnames'

import styles from '@/components/link/link.module.css'

interface LinkProps {
  children: ReactNode
  className?: string
  href?: string
  ariaLabel?: string
}

export const Link: FC<LinkProps> = props => {
  const { className, children, href = '/', ariaLabel = 'Ссылка' } = props

  return (
    <a
      href={href}
      className={classNames(styles.link, className)}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}
