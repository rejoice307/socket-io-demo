import type { AddUserFn, DeleteUserFn, GetUserFn, GetUsersByRoomFn, UserType } from './types'

const users: UserType[] = []

const addUser: AddUserFn = (id, username, room) => {
  const existingUser = users.find(user => user.username.trim().toLowerCase() === username.trim().toLowerCase())

  if (existingUser) return { error: "Username has already been taken" }
  if (!username && !room) return { error: "Username and room are required" }
  if (!username) return { error: "Username is required" }
  if (!room) return { error: "Room is required" }

  const user: UserType = { id, username, room }
  users.push(user)
  return { user }
}

const getUser: GetUserFn = (newUserId) => {
  return users.find(user => user.id === newUserId)
}

const deleteUser: DeleteUserFn = (newUserId) => {
  return users.find(user => user.id === newUserId)
}

const getUsersByRoom: GetUsersByRoomFn = (newRoom) => users.filter(user => user.room === newRoom)

export { addUser, deleteUser, getUser, getUsersByRoom }
