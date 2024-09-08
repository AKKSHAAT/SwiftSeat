import React from 'react'

import AppLink from "@/Components/AppLink";

const Nav = ({auth}) => {
  return (
    <nav className="text-white justify-between flex flex-wrap py-2 px-2 border-b-2 border-white mb-6">
        <div className="font-bold">
            <AppLink href={'/'} >SwiftSeat</AppLink>
        </div>
  
        <div >
          <AppLink>Event </AppLink>
          <AppLink>My Tickets </AppLink>
        </div>

        <div>
          {auth?.user ? (
            <AppLink href={route("dashboard")}>Dashboard</AppLink>
          ) : (
            <>
              <AppLink href={route("login")}>Log in</AppLink>
              <AppLink href={route("register")}>Register</AppLink>
            </>
          )}
        </div>
      </nav>
  )
}

export default Nav