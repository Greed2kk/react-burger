import { ReactElement } from 'react'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import styles from '@/components/tabs/tabs.module.css'

export interface TabsOptions<T = string> {
  value: T
  name: string
}

interface TabsProps<T> {
  tabs: TabsOptions<T>[]
  tabClickHandler?: (value: string) => void
  currentTab?: T
  className?: string
}

export const Tabs = <T extends string>(props: TabsProps<T>): ReactElement => {
  const { currentTab, tabClickHandler = () => {}, tabs, className } = props

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
