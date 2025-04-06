import { client } from "@/sanity/lib/client"
import { STARTUP_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import React, { Suspense } from 'react'
import StartupCard, { StartupTypeCard } from "./StartupCard"
import Image from "next/image"
import StartupCardSkeleton from "./StartupCardSkeleton"

export const experimental_ppr = true

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUP_BY_AUTHOR_QUERY, { id})
  
  return <>
      {(startups !== undefined || startups?.length > 0) ?
        <ul className="list-none mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<StartupCardSkeleton/>}>
            {startups.map((startup) => <StartupCard key={startup._id} post={startup} />)}
          </Suspense>
        </ul>
      :
        <div className="w-full flex flex-col items-center justify-end">
          <Image className="w-[400px]" src="/images/no-pitch.png" alt="No image included by the user" width={400} height={400} />
          <p className="text-2xl font-bold">No pitch yet</p>
        </div>
      }
    </>
}

export default UserStartups