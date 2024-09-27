import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from './components/Layout'
import { WebSocketContextProvider } from "./states/useWebSocketContext"
import { AuthProvider } from './states/useAuthContext'

const HomePage = lazy(() => import("./pages/Home"))


const App = () => {

  return (
    <WebSocketContextProvider>
      <AuthProvider>

        <BrowserRouter>
          <Routes>

            <Route path="/" element={
              <Layout>
                <HomePage />
              </Layout>
            } />

          </Routes>
        </BrowserRouter>

      </AuthProvider>
    </WebSocketContextProvider>
  )
}

export default App
