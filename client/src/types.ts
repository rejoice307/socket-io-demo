import type { ReactNode } from 'react'

export type ChildrenType = Readonly<{ children: ReactNode }>

export type UserType = {
  id: string
  email: string
  username: string
  token: string
  room: string
}