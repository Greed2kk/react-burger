import { FC, ReactNode } from 'react'

import classNames from 'classnames'

import styles from '@/components/content-wrapper/content-wrapper.module.css'

interface ContentWrapperProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'main'
}

export const ContentWrapper: FC<ContentWrapperProps> = props => {
  const { children, className, as = 'div' } = props

  switch (as) {
    case 'div':
      return (
        <div className={classNames(styles.contentWrapper, className)}>
          {children}
        </div>
      )
    case 'main':
      return (
        <main className={classNames(styles.mainContentWrapper, className)}>
          {children}
        </main>
      )
    default:
      return null
  }
}
