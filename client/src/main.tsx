import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { WebSocketContextProvider } from './states/useWebSocketContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebSocketContextProvider>
      <App />
    </WebSocketContextProvider>
  </StrictMode>
)
