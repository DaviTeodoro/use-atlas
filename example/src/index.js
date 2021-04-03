import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AtlasProvider } from 'use-atlas'

ReactDOM.render(
  <React.StrictMode>
    <AtlasProvider>
      <App />
    </AtlasProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
