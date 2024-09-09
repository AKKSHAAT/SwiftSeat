import React from "react";

import AppLink from "@/Components/AppLink";
import { usePage } from "@inertiajs/react";

import {Link} from "@inertiajs/react";

const Nav = () => {
  const { auth } = usePage().props;

  return (
    <nav className="text-white justify-between flex flex-wrap py-2 px-2 border-b-2 border-white mb-6 z-50">
      <div className="font-bold">
        <AppLink href={"/"}>SwiftSeat</AppLink>
      </div>

      <div>
        <AppLink>Event </AppLink>
        <AppLink href={route("tickets.index")}>My Tickets </AppLink>
      </div>

      <div>
        {auth?.user ? (
          <>
            <AppLink href={route("dashboard")}>Dashboard</AppLink>
            <Link method="post" href={route('logout')} as="button" className="px-2 hover:text-red translate-colors duration-300">
              Log Out
            </Link>
          </>
        ) : (
          <>
            <AppLink href={route("login")}>Log in</AppLink>
            <AppLink href={route("register")}>Register</AppLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
