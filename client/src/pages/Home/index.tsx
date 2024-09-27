import { FormEvent, useRef, useState } from "react"
import { useWebSocketContext } from "../../states/useWebSocketContext"

const HomePage = () => {

  const { isConnected, socket } = useWebSocketContext()

  const [messages, setMessages] = useState<string[] | undefined>([])
  const [joinedRoom, setJoinedRoom] = useState('')

  const messageInputRef = useRef<HTMLInputElement>(null)
  const roomInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!!messageInputRef.current?.value && isConnected) {
      socket?.emit('send-msg', { message: messageInputRef.current.value, room: joinedRoom })
      updateMessages(messageInputRef.current.value)
      messageInputRef.current.value = ''
    }
  }

  const joinRoom = () => {
    if (!!roomInputRef.current?.value && isConnected) {
      socket?.emit('join-room', roomInputRef.current.value)
      setJoinedRoom(roomInputRef.current.value)
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

  socket?.on('msg-received', (msg) => {
    updateMessages(msg)
  })


  return (
    <main className='container mx-auto max-w-screen-lg'>
      <div className="border-2 border-black mt-4">
        {isConnected && <p className="mx-4 font-bold">Socket ID: {socket?.id}
          {!!joinRoom && <span className="ml-4">{joinedRoom}</span>}
        </p>}
        <div className="mx-2 border border-black py-2 px-2 mt-6 mb-4">

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
          <button onClick={joinRoom} type="button" className="border-2 border-teal-800 px-4 py-2 rounded bg-slate-100">Join</button>
        </p>
      </form>

    </main>
  )
}

export default HomePage