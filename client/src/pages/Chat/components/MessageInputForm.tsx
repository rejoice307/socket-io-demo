import { useWebSocketContext } from '@/states/useWebSocketContext'
import { useState, type FormEvent } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'

const MessageInputForm = () => {

  const { socket } = useWebSocketContext()
  const [message, setMessage] = useState('')

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault()
    if (socket) {
      socket.emit('sendMessage', message)
      setMessage('')
    }
  }

  return (
    <form
      className="flex items-center bg-white p-2 border-t"
      onSubmit={handleSendMessage}
    >
      <input
        type="text"
        placeholder="Enter Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        className={`ml-2 p-2 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none ${message === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleSendMessage}
        disabled={message === ''}
      >
        <RiSendPlaneFill />
      </button>
    </form>
  )
}

export default MessageInputForm