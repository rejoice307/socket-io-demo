import express from 'express'
import { Server } from 'socket.io'
import cors, { CorsOptions } from "cors"
import { createServer } from 'node:http'
import { addUser, deleteUser, getUser, getUsersByRoom } from './users'

const app = express()
const server = createServer(app)

const corOptions: CorsOptions = {
  origin: "*",
}

const io = new Server(server, {
  cors: corOptions
})

app.use(cors(corOptions))

io.on('connection', (socket) => {
  console.info('new user has connected with id: ', socket.id)

  socket.on('login', ({ name, room }, callback) => {
    const { user, error } = addUser(socket.id, name, room)
    if (error) return callback(error)
    if (user) {
      socket.join(user.room)
      socket.in(room).emit('notification', { title: "You got a new message", description: `${user.username} just entered the room` })
      io.in(room).emit('users', getUsersByRoom(room))
      callback()
    }
  })

  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id)
    if (user) {
      io.in(user.room).emit('message', { user: user.username, text: message })
    }
  })

  socket.on('disconnect', () => {
    console.info('User Disconnected', socket.id)
    const user = deleteUser(socket.id)
    if (user) {
      io.in(user.room).emit('notification', { title: 'Someone just left', description: `${user.username} just left the room` })
      io.in(user.room).emit('users', getUsersByRoom(user.room))
    }
  })



  socket.on('join-room', (roomId) => {
    socket.join(roomId)
  })

  socket.on('send-msg', (data) => {
    socket.to(data.room).emit('msg-received', data.message)
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Chat app</h1>')
})

server.listen(9000, () => {
  console.info('server started at http://localhost:9000')
})
