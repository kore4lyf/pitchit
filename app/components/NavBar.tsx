import { auth, signIn, signOut } from "@/auth";
import Image from "next/image"
import Link from "next/link"
import React from 'react'
import SearchForm from "./SearchForm";

const NavBar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo"  width={54} height={30} />
        </Link>

        <div  className="flex gap-5">
          <div className="flex  item-center gap-5 text-black-200">   
            {session && session?.user ? (
              <>
                <Link href="/startup/create">
                  <span>Create</span>
                </Link>

                <form action={async () => {
                  "use server"
                  await signOut({redirectTo: "/"})
                }}>
                  <button type="submit"> Logout </button>
                </form>

                <Link href={`/user/${session?.id}`}>
                  <span> {session?.user?.name} </span>
                </Link>
              </>
            ):(
              <form action={async () => {
                "use server"
                await signIn("github")
              }}>
                <button type="submit">Login</button>
              </form>
            )}
          </div>

        </div>
      </nav>

    </div>
  )
}

export default NavBar