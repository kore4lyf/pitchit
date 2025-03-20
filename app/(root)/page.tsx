import React from 'react'
import Hero from "../../components/Hero"
import SearchForm from "../../components/SearchForm"
import StartupCard from "@/components/StartupCard"

const HomePage = async ({ searchParams }: {
searchParams: Promise<{ query?: string }>
}) => {
  const query =  (await searchParams).query

  interface PostContent {
    _createdAt: string,
    views: 55,
    author: { _id: number, name: string },
    _id: number,
    description: string,
    image: string,
    category: string,
    title: string
  }

  const posts: PostContent[] = [
    {
      _createdAt: new Date().toDateString().slice(4),
      views: 55,
      author: { _id: 1, name: "Korede" },
      _id: 1, 
      description: "Here is a description",
      image: "/images/pitchit-hero.png",
      category: "CookBook",
      title: "AI Masterclass"
    },
    {
      _createdAt: new Date().toDateString().slice(4),
      views: 55,
      author: { _id: 1, name: "Korede" },
      _id: 2, 
      description: "Here is a description",
      image: "/images/pitchit-hero.png",
      category: "CookBook",
      title: "AI Masterclass"
    },
    {
      _createdAt: new Date().toDateString().slice(4),
      views: 55,
      author: { _id: 1, name: "Korede" },
      _id: 3, 
      description: "Here is a description",
      image: "/images/pitchit-hero.png",
      category: "CookBook",
      title: "AI Masterclass"
    },
    {
      _createdAt: new Date().toDateString().slice(4),
      views: 55,
      author: { _id: 1, name: "Korede" },
      _id: 4, 
      description: "Here is a description",
      image: "/images/pitchit-hero.png",
      category: "CookBook",
      title: "AI Masterclass"
    },
    {
      _createdAt: new Date().toDateString().slice(4),
      views: 55,
      author: { _id: 1, name: "Korede" },
      _id: 5, 
      description: "Here is a description",
      image: "/images/pitchit-hero.png",
      category: "CookBook",
      title: "AI Masterclass"
    },
    {
      _createdAt: new Date().toDateString().slice(4),
      views: 55,
      author: { _id: 1, name: "Korede" },
      _id: 6, 
      description: "Here is a description",
      image: "/images/pitchit-hero.png",
      category: "CookBook",
      title: "AI Masterclass"
    },
  ]

  return (
    <>
      <Hero query={query} />
      
      <section className="width_90pct">
        <p className="text-3xl font-bold">
          {query ? `Search result for ${query}`: "All Startups"}
        </p>
        
        <ul className="list-none mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.length > 0 ? (
            posts.map((post: PostContent, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ): (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  )
}

export default HomePage