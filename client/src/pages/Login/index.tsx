import { useAuthContext } from '@/states/useAuthContext'
import { useState, type ChangeEvent, type FormEvent } from "react"

const LoginPage = () => {

  const { saveSession } = useAuthContext()

  const [formData, setFormData] = useState({
    username: "",
    room: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    saveSession(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="room" className="block text-gray-600 font-semibold mb-2">
              Room
            </label>
            <input
              type="text"
              id="room"
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your room"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
