import { LuBell, LuBellDot } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { useWebSocketContext } from '../states/useWebSocketContext'

const NavBar = () => {

  const { unreadMessagesCount, isConnected } = useWebSocketContext()

  return (
    <nav className='flex w-full h-10 border-black border items-center justify-between px-4'>

      <span className={`${isConnected ? 'bg-green-600' : 'bg-red-600'} h-4 w-4 block rounded-full`} />

      <Link className='p-2 cursor-pointer' to='/'>
        {(unreadMessagesCount > 0) ?
          (<LuBellDot size={22} color='green' />) :
          (<LuBell size={22} />)
        }
      </Link>

    </nav>
  )
}

export default NavBar