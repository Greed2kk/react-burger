import { FC, ReactNode } from 'react'

import { Provider as ReduxProvider } from 'react-redux'

import { store } from './store'

import { StateSchema } from './types'

interface Props {
  children: ReactNode
  initialState?: StateSchema
}

export const StoreProvider: FC<Props> = ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
)

export default StoreProvider