import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { MusicPlayerProvider } from './Context/MusicPlayerContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MusicPlayerProvider>
      <Router>
        <App />
      </Router>
    </MusicPlayerProvider>
  </React.StrictMode>,
)
