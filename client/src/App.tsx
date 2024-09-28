import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from './components/Layout'
import { WebSocketContextProvider } from "./states/useWebSocketContext"
import { AuthProvider } from './states/useAuthContext'

const ChatPage = lazy(() => import("./pages/Chat"))
const LoginPage = lazy(() => import("./pages/Login"))
const NotFoundPage = lazy(() => import('./pages/NotFound'))

const App = () => {

  return (
    <BrowserRouter>
      <WebSocketContextProvider>
        <AuthProvider>

          <Routes>

            <Route path="/" element={<Layout><LoginPage /></Layout>} />
            <Route path="/chat" element={<Layout><ChatPage /></Layout>} />
            <Route path="*" element={<NotFoundPage />} />

          </Routes>

        </AuthProvider>
      </WebSocketContextProvider>
    </BrowserRouter>
  )
}

export default App
