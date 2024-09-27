import { Suspense } from 'react'
import type { ChildrenType } from '../types'
import NavBar from './NavBar'
import FullScreenSpinner from './FullScreenSpinner'
import { useWebSocketContext } from '@/states/useWebSocketContext'

const Layout = ({ children }: ChildrenType) => {

  const { isConnected } = useWebSocketContext()

  if (!isConnected) return <FullScreenSpinner />

  return (
    <>
      <NavBar />

      <Suspense fallback={<FullScreenSpinner />}>{children}</Suspense>
    </>
  )
}

export default Layout