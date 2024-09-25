import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"

const socket = io('http://localhost:9000')

function App() {

  const [socketId, setSocketId] = useState('')
  const [messages, setMessages] = useState<string[] | undefined>([])

  const messageInputRef = useRef<HTMLInputElement>(null)
  const roomInputRef = useRef<HTMLInputElement>(null)

  socket.on('connect', () => {
    if (!!socket.id) setSocketId(socket.id)
  })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!!messageInputRef.current?.value && socket.connected) {
      socket.emit('send-msg', messageInputRef.current.value)
      updateMessages(messageInputRef.current.value)
      messageInputRef.current.value = ''
    } else if (!!roomInputRef.current?.value) {
      socket.emit('join-room', roomInputRef.current.value)
      roomInputRef.current.value = ''
    }
  }

  const updateMessages = (msg: string) => {
    if (!!messages?.length) {
      if (messages) setMessages([...messages, msg])
    } else {
      setMessages([msg])
    }
  }

  socket.on('msg-received', (msg) => {
    updateMessages(msg)
  })

  return (
    <main className='container mx-auto max-w-screen-lg'>
      <div className="border-2 border-black mt-4">
        {!!socketId && <p className="mx-4 font-bold">Socket ID: {socketId}</p>}
        <div className="mx-2 border border-black py-2 px-2 my-4">

          {!!messages?.length && messages.map((msg, idx) => (
            <p key={msg + idx} className="border-2 my-2 px-2 border-teal-900">{msg}</p>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full mx-auto mt-6 flex-col gap-4">
        <p className="flex justify-between w-full items-center">
          <span>Message:</span>
          <input ref={messageInputRef} type="text" name="message" className="border-2 border-teal-800 rounded w-full mx-4 py-2" />
          <button type="submit" className="border-2 border-teal-800 px-4 py-2 rounded bg-slate-100">Send</button>
        </p>

        <p className="flex justify-between w-full items-center">
          <span>Room:</span>
          <input ref={roomInputRef} type="text" name="room" className="border-2 border-teal-800 rounded w-full mx-4 py-2" />
          <button type="submit" className="border-2 border-teal-800 px-4 py-2 rounded bg-slate-100">Join</button>
        </p>
      </form>

    </main>
  )
}

export default App
