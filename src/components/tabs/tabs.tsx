import { FC } from 'react'

import classNames from 'classnames'

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
  className?: string
}

export const Tabs: FC<TabsProps> = props => {
  const {
    currentTab,
    tabClickHandler = () => {},
    tabs,
    className,
  } = props

  return (
    <div className={classNames(styles.tabsContainer, className)}>
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
