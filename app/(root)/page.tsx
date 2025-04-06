import React from 'react'
import Hero from "../../components/Hero"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"
import { STARTUP_QUERY } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client"
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { STARTUP_QUERYResult, Startup_Query } from "@/sanity.types-copy"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import Image from "next/image"


async function fetchPosts(params: { search: string | null }): Promise<STARTUP_QUERYResult | undefined> {
  try {
    const posts: STARTUP_QUERYResult = await client.fetch(STARTUP_QUERY, params, { useCdn: false})

    // const { data: posts }: { data: STARTUP_QUERYResult } = await sanityFetch({query: STARTUP_QUERY, params}) // Live update fetch
    if(!posts) notFound()

    return posts
  } catch(error) {
    console.log("Error Fetching Data: ", error)
  } 
}

const HomePage = async ({ searchParams }: {
  searchParams: Promise<{ query?: string }> }) => {
   
  const query =  (await searchParams).query
  const params = { search: query || null }

  const session = await auth()
  

  const posts : STARTUP_QUERYResult | undefined = await fetchPosts(params)

  return ( 
    <>
      <Hero query={query} />
      
      <section className="width_90pct">
        <p className="text-3xl font-bold">
          {query ? `Search result for ${query}`: <span className="uppercase">All Startups</span>}
          
        </p>
        
        <ul className="list-none mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(posts !== undefined || posts?.length > 0) && (
            posts.map((post: Startup_Query) => (
              <StartupCard key={post?._id} post={post} />
            ))
          )
          }
        </ul>

        { (posts === undefined || posts?.length === 0) &&
        <div className="w-full flex flex-col items-center justify-end">
          <Image className="w-[400px]" src="/images/no-pitch.png" alt="No image included by the user" width={400} height={400} />
          <p className="text-2xl font-bold">No pitch found</p>
        </div>}
      </section>
      <SanityLive/>
    </>
  )
}

export default HomePage