import { Server } from "socket.io";

const io = new Server(8001, {
  cors: {
    origin: ['*']
  }
});

// console.log('iooo',io)

io.on("connection", (socket) => {
  console.log('socket id', socket.id)
  socket.emit("Hellow", "World")

  socket.on('hie', (arg) => {
    console.log('argsss on "hi"', arg)
  })

});
