import React, { FC, Fragment } from 'react'

import { AppHeader } from '../app-header/app-header'
import BurgerConstructorPage from '../pages/burger-constructor-page/burger-constructor-page'

const App: FC = () => (
  <Fragment>
    <AppHeader />
    <BurgerConstructorPage />
  </Fragment>
)

export default App
