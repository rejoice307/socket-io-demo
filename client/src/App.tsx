import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import { WebSocketContextProvider } from "./states/useWebSocketContext"

// const socket = io('http://localhost:9000')

function App() {

  return (
    <WebSocketContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </WebSocketContextProvider>
  )
}

export default App
