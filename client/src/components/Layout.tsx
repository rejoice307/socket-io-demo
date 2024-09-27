import { Suspense } from 'react'
import type { ChildrenType } from '../types'
import NavBar from './NavBar'
import FullScreenSpinner from './FullScreenSpinner'

const Layout = ({ children }: ChildrenType) => {

  return (
    <>
      <NavBar />

      <Suspense fallback={<FullScreenSpinner />}>{children}</Suspense>
    </>
  )
}

export default Layout