import './main.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => <div>Инициализация проекта</div>

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
