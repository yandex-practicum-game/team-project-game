import './main.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import AlertTemplate from 'react-alert-template-basic'

import { RouterProvider } from 'react-router-dom'
import { Provider as AlertProvider } from 'react-alert'
import { router } from './routers'
import { Provider } from 'react-redux'
import { store } from './store'
import { serviceWorkerRegistration } from '../serviceWorkerRegistration'

export const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <RouterProvider router={router} />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
)

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />)

if (process.env.NODE_ENV === 'production') {
  serviceWorkerRegistration()
}