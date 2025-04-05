import React from 'react'
import Hero from "../../components/Hero"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"
import { STARTUP_QUERY } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client"
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { STARTUP_QUERYResult, Startup_Query } from "@/sanity.types-copy"
import { auth } from "@/auth"

let cachedPosts: STARTUP_QUERYResult = []


async function fetchPostsWithCache(params: { search: string | null }): Promise<STARTUP_QUERYResult | undefined> {
  try {
    // const posts: STARTUP_QUERYResult = await client.fetch(STARTUP_QUERY)

    const { data: posts }: { data: STARTUP_QUERYResult } = await sanityFetch({query: STARTUP_QUERY, params}) // Live update fetch
    
    if(!posts && cachedPosts.length === 0) throw new Error("Couldn't fetch data")

    if(posts) {
      cachedPosts = posts
    }
    
    return posts
  } catch(error) {
    console.log("Error Fetching Data: ", error)
    if(cachedPosts.length !== 0)  return cachedPosts
  } 
}

const HomePage = async ({ searchParams }: {
  searchParams: Promise<{ query?: string }> }) => {
   
  const query =  (await searchParams).query
  const params = { search: query || null }

  const session = await auth()
  console.log(session?.id)
  

  const posts : STARTUP_QUERYResult | undefined = await fetchPostsWithCache(params)

  return ( 
    <>
      <Hero query={query} />
      
      <section className="width_90pct">
        <p className="text-3xl font-bold">
          {query ? `Search result for ${query}`: <span className="uppercase">All Startups</span>}
          
        </p>
        
        <ul className="list-none mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts !== undefined && posts?.length > 0 ? (
            posts.map((post: Startup_Query) => (
              <StartupCard key={post?._id} post={post as StartupTypeCard} />
            ))
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive/>
    </>
  )
}

export default HomePage