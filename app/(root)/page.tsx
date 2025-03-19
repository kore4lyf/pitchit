import React from 'react'
import Hero from "../components/Hero"
import SearchForm from "../components/SearchForm"

const HomePage = async ({ searchParams }: {
searchParams: Promise<{ query?: string }>
}) => {
  const query =  (await searchParams).query
  return (
    <>
      <SearchForm query={query} />
      <Hero />
      
    </>
  )
}

export default HomePage