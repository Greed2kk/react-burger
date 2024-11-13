import React from 'react'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './tabs.module.css'

interface TabsOptions {
  value: string
  name: string
}

interface TabsProps {
  tabs: TabsOptions[]
  tabClickHandler?: (value: string) => void
  currentTab?: string
}

class Tabs extends React.Component<TabsProps, {}> {
  render() {
    const { currentTab = 'one', tabClickHandler = () => {}, tabs } = this.props

    return (
      <div className={styles.tabsContainer}>
        {tabs.map(({ name, value }) => (
          <Tab
            key={value}
            value={value}
            active={currentTab === value}
            onClick={tabClickHandler}
          >
            {name}
          </Tab>
        ))}
      </div>
    )
  }
}

export default Tabs
