import { client } from "@/sanity/lib/client"
import { STARTUP_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import React from 'react'
import StartupCard, { StartupTypeCard } from "./StartupCard"
import Image from "next/image"

export const experimental_ppr = true

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUP_BY_AUTHOR_QUERY, { id})
  
  return (
    <>
      {startups.length > 0 ?
        startups.map((startup: StartupTypeCard) => 
        <StartupCard key={startup._id} post={startup} />):
        (<div className="grid gap-5 mx-auto">
          <Image src="/images/no-pitch.png" alt="No image included by the user"/>
          <p>No startups yet</p>
          </div>
          )}
    </>
  )
}

export default UserStartups