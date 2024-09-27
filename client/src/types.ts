import type { ReactNode } from 'react'

export type ChildrenType = Readonly<{ children: ReactNode }>

export type UserType = {
  id: string
  username: string
  room: string
}