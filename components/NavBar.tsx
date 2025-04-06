import { auth, signIn, signOut } from "@/auth";
import Image from "next/image"
import Link from "next/link"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, PlusCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const NavBar = async () => {
  const session = await auth();

  return (
    <nav className="py-3 text-black-200 bg-white shadow-sm">
      <div className="width_90pct flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo"  width={54} height={30} />
        </Link>

        <div  className="flex gap-5">
          <div className="flex gap-5">   
            {session && session?.user ? (
              <>
                <Link href="/startup/create" className="flex gap-2 items-center">
                  Create <PlusCircle className="size-4 text-green-500"/>
                </Link>

                <Popover>
                  <PopoverTrigger className="flex gap-2 items-center">
                  <span> {session?.user?.name} </span>
                    <Avatar className="w-fit h-fit">
                      <AvatarImage src={session?.user?.image} className="w-7 h-7 rounded_full outline outline-2 outline-gray-300 hover:outline-customTeal outline-offset-1"/>
                      <AvatarFallback className="border rounded_full p-2 w-8 h-8">{session?.user.name !== undefined && session?.user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-[180px] p-0 mr-3">
                    <ul className="font-work-sans">
                      <li className="grid px-4 py-2 hover:bg-opacity-30 hover:bg-gray-100">
                        <Link href={`/user/${session?.id}`} className="flex items-center"> Profile </Link>
                      </li>

                      <hr/>

                      <li className="grid px-4 py-2 hover:bg-gray-100 hover:bg-opacity-30 hover:text-red-600">
                        <form action={async () => {
                        "use server"
                        await signOut({redirectTo: "/"})
                      }}>
                          <button type="submit" className="w-full flex gap-2 items-center"> <LogOut className="size-4 text-red-600" /> Logout </button>
                        </form>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
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
    </div>
    </nav>
  )
}

export default NavBar