import React from 'react'

import styles from './content-wrapper.module.css'

interface ContentWrapperProps {
  children: React.ReactNode
}

class ContentWrapper extends React.Component<ContentWrapperProps, {}> {
  render() {
    const { children } = this.props

    return <div className={styles.contentWrapper}>{children}</div>
  }
}

export default ContentWrapper
