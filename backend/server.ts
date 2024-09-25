import express from 'express'
import { Server } from 'socket.io'
import cors, { CorsOptions } from "cors";
import { createServer } from 'node:http'

const app = express()
const server = createServer(app);

const corOptions: CorsOptions = {
  origin: "http://localhost:3000",
};

const io = new Server(server, {
  cors: corOptions
})

app.use(cors(corOptions));

io.on('connection', (socket) => {
  console.info('new user has connected with id: ', socket.id)
  socket.on('send-msg', (msg) => {
    socket.broadcast.emit('msg-received', msg)
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Chat app</h1>');
})

server.listen(9000, () => {
  console.info('server started at http://localhost:9000')
})
