import React from 'react'

import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from '@/components/app/app'
import { persistor } from '@/components/app/store/store'
import StoreProvider from '@/components/app/store/store-provider'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Router>
      <StoreProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </StoreProvider>
    </Router>
  </React.StrictMode>,
)
