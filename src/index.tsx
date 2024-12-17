import React from 'react'

import ReactDOM from 'react-dom/client'

import App from '@/components/app/app'
import StoreProvider from '@/components/app/store/store-provider'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
)
