// useAuthContext
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ChildrenType, UserType } from '../types'
import { useWebSocketContext } from './useWebSocketContext'

export type AuthContextType = {
  user: UserType | undefined
  users: UserType[] | undefined
  saveSession: (session: Omit<UserType, 'id'>) => void
  removeSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext () {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider ({ children }: ChildrenType) {

  const navigate = useNavigate()

  const { socket } = useWebSocketContext()

  const [user, setUser] = useState<UserType | undefined>({ id: '', room: '', username: '' })

  const [users, setUsers] = useState<UserType[] | []>([])

  const saveSession: AuthContextType['saveSession'] = useCallback(({ username, room }) => {
    console.log('usernamee', username, room, socket)
    socket?.emit('login', { username, room }, (error: string) => {
      if (error) alert(error)
      navigate('/chat')
    })

    setUser(user)
  }, [socket])

  const removeSession = useCallback(() => {
    setUser(undefined)
    navigate('/')
  }, [])

  useEffect(() => {
    socket?.on('users', (users) => {
      setUsers(users)
    })
  }, [socket])

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        saveSession,
        removeSession,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
