import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import { io, Socket } from "socket.io-client"

type WebSocketContextType = {
  isConnected: boolean
  socket: Socket | undefined
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useWebSocketContext must be used inside of WebSocketContext')
  }
  return context
}

const socket = io('http://localhost:9000', { transports: ['websocket', 'polling'] })

export const WebSocketContextProvider = ({ children }: { children: ReactNode }) => {

  const [socketConnection, setSocketConnection] = useState<Socket | undefined>()

  socket.on('connect', () => {
    setSocketConnection(socket)
    socket.on('disconnect', () => {
      setSocketConnection(undefined)
    })
  })

  return (
    <WebSocketContext.Provider value={{
      isConnected: socketConnection?.active ?? false,
      socket: socketConnection,
    }}>
      {children}
    </WebSocketContext.Provider>
  )
}