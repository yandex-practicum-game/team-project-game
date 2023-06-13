import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import AlertTemplate from 'react-alert-template-basic'

import { Provider as AlertProvider } from 'react-alert'
import { StaticRouter } from 'react-router-dom/server'
import { store } from './src/store'
import { Routes } from 'react-router-dom'
import { routes } from './src/routers/routes'
import { Route } from 'react-router-dom'

export function render(url: string) {
  return renderToString(
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <StaticRouter location={url}>
          <Routes>
            {routes.map(({ element, path }) => (
              <Route key={path} element={element} path={path} />
            ))}
          </Routes>
        </StaticRouter>
      </AlertProvider>
    </Provider>
  )
}

export { store }
