import React, { FC } from 'react'

import { BrowserRouter as Router } from 'react-router-dom'

import Routes from '@/components/app/routes/routes'

const App: FC = () => (
  <Router>
    <Routes />
  </Router>
)

export default App
