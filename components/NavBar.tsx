import { auth, signIn, signOut } from "@/auth";
import Image from "next/image"
import Link from "next/link"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
                {console.log(session)}
                <Link href={`/user/${session?.id}`} className="flex items-center">
                  <span> {session?.user?.name} </span>
                  <Avatar className="w-fit h-fit">
                    <AvatarImage src={session?.user?.image} className="w-8 h-8 rounded_full outline outline-2 outline-gray-300 hover:outline-customTeal outline-offset-1"/>
                    <AvatarFallback className="border rounded_full p-2 w-8 h-8">{session?.user.name !== undefined && session?.user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
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