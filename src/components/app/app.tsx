import React, { FC, Fragment } from 'react'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { AppHeader } from '../app-header/app-header'
import BurgerConstructorPage from '../../pages/burger-constructor-page/burger-constructor-page'

const App: FC = () => (
  <Fragment>
    <AppHeader />

    <DndProvider backend={HTML5Backend}>
      <BurgerConstructorPage />
    </DndProvider>
  </Fragment>
)

export default App
