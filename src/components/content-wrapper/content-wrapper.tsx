import React from 'react'

import classNames from 'classnames'

import styles from './content-wrapper.module.css'

interface ContentWrapperProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'main'
}

class ContentWrapper extends React.Component<ContentWrapperProps, {}> {
  render() {
    const { children, className, as = 'div' } = this.props

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
}

export default ContentWrapper
