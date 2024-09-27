
export type UserType = {
  id: string
  username: string
  room: string
}

export type AddUserFn = (id: string, username: string, room: string) => { error?: string, user?: UserType }

export type GetUserFn = (id: string) => UserType | undefined

export type DeleteUserFn = (id: string) => UserType | undefined

export type GetUsersByRoomFn = (room: string) => UserType[]
