import { auth, signIn, signOut } from "@/auth";
import Image from "next/image"
import Link from "next/link"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Menubar, MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarTrigger, MenubarItem, MenubarSeparator } from "./ui/menubar";
import { LogOut, PlusCircle } from "lucide-react";

const NavBar = async () => {
  const session = await auth();

  return (
    <div className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo"  width={54} height={30} />
        </Link>

        <div  className="flex gap-5">
          <Link href="/startup/create" className="flex gap-2 items-center">
            Create <PlusCircle className="size-4 text-green-500"/>
          </Link>

          <div>   
            {session && session?.user ? (
              <>
                <Menubar className=" border-0 shadow-none">
                  <MenubarMenu>
                  <MenubarTrigger className="flex gap-2">
                    <span> {session?.user?.name} </span>
                    <Avatar className="w-fit h-fit">
                      <AvatarImage src={session?.user?.image} className="w-7 h-7 rounded_full outline outline-2 outline-gray-300 hover:outline-customTeal outline-offset-1"/>
                      <AvatarFallback className="border rounded_full p-2 w-8 h-8">{session?.user.name !== undefined && session?.user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </MenubarTrigger>
                
                  <MenubarContent className="font-work-sans">

                  <MenubarItem inset>
                    <Link href={`/user/${session?.id}`} className="flex items-center font-medium"> Profile </Link>
                  </MenubarItem>
                  <MenubarSeparator />

                  <MenubarItem inset className="hover:text-red-600">
                    <form action={async () => {
                      "use server"
                      await signOut({redirectTo: "/"})
                    }}>
                      <button type="submit" className="flex gap-2 items-center"> Logout <LogOut className="size-4 text-red-600" /> </button>
                    </form>
                  </MenubarItem>
                  </MenubarContent>
                  </MenubarMenu>
                </Menubar>
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