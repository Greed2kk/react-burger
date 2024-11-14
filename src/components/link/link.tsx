import React from 'react'

import classNames from 'classnames'

import styles from './link.module.css'

interface LinkProps {
  children: React.ReactNode
  className?: string
  href?: string
  ariaLabel?: string
}

class Link extends React.Component<LinkProps, {}> {
  render() {
    const { className, children, href = '/', ariaLabel = 'Ссылка' } = this.props

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
}

export default Link
