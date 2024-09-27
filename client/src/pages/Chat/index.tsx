import { useAuthContext } from '@/states/useAuthContext'
import { useWebSocketContext } from '@/states/useWebSocketContext'
import { useEffect, useRef, useState } from 'react'
import { BiMessageDetail } from 'react-icons/bi'
import { FiList } from 'react-icons/fi'
import MessageInputForm from './components/MessageInputForm'

const ChatApp = () => {

  const { socket } = useWebSocketContext()
  const { user, users, removeSession } = useAuthContext()

  const [messages, setMessages] = useState<string[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    socket?.on('message', (msg: string) => {
      setMessages(messages => [...messages, msg])
    })

    socket?.on('notification', (notification: { title: string, description: string }) => {
      alert(notification.title)
    })

  }, [socket])

  useEffect(() => {
    if (!user) removeSession()
  }, [])

  // Scroll last message into view
  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col w-full max-w-xl h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-t-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="relative">
            <button className="bg-blue-500 text-white rounded-full p-2 focus:outline-none">
              <FiList />
            </button>
            <div className="absolute mt-2 bg-white rounded shadow-lg w-48 z-10">
              {users && users.map((user) => (
                <div key={user.id} className="p-2 border-b last:border-b-0">
                  <p className="text-sm">{user.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold">
              {room.charAt(0).toUpperCase() + room.slice(1)}
            </h4>
            <div className="flex items-center">
              <span className="mr-1 text-gray-700 text-sm">{name}</span>
              <span className="h-2 w-2 bg-green-400 rounded-full"></span>
            </div>
          </div>

          <button className="text-sm text-gray-500 hover:text-gray-700" onClick={removeSession}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto bg-gray-100 p-4">
        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <div key={i} className={`message mb-2 ${msg.user === name ? "self-end" : "self-start"}`}>
              <p className="text-xs text-gray-600 ml-2">{msg.user}</p>
              <p className="msg p-2 bg-blue-500 text-white rounded-xl">{msg.text}</p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center mt-2 bg-gray-200 text-gray-500 opacity-70 w-full py-2">
            <span>-----</span>
            <BiMessageDetail className="mx-2 text-xl" />
            <span>No messages</span>
            <span>-----</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInputForm />

    </div>
  )
}

export default ChatApp