import React from 'react'
import NavBar from './NavBar'
import { auth } from '@/auth'

const NavBarContainer = async () => {
  const session = await auth()
  const user = session?.user

  const safeUser = user?.email && user?.name && user?.image
    ? {
        name: user.name,
        email: user.email,
        image: user.image,
      }
    : undefined

  return <NavBar loggedInUser={safeUser} />
}

export default NavBarContainer
