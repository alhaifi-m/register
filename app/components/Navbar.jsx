'use client'
import React from "react";
import Link from "next/link";
import { useSession } from 'next-auth/react'

const Navbar = () => {
const { status, data: session} = useSession()

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>Home</li>
        <li>About</li>
        <li>
            {status === 'loading' && <div>Loading ...</div>}
            {status === 'authenticated' && <div>{session.user.name}
            <Link href="/api/auth/signout" className="ml-3"> Logout</Link>
            </div>}
          {status === 'unauthenticated' && <Link href="/api/auth/signin"> Login</Link>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
