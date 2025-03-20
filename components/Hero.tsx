import React from 'react'
import SearchForm from "./SearchForm"

const Hero = ({ query }:{ query: string | undefined}) => {

  return (
    <section className="hero">
        <div className="hero_container bg-[url('/images/bulb.png')] md:bg-none bg-no-repeat bg-right-bottom  overflow-hidden">
          <div className="bg-[url('/images/pitchit-hero0.png')] hidden md:inline bg-no-repeat bg-center h-[400px] border w-full"></div>
          <div>
            <h1 className="hero_title"> Connect with investors </h1>
            <p className="text-gray-700 py-6"> Narrate your ideas, submit them and get noticed.</p>
            <SearchForm query={query} />
          </div>
        </div>
      </section>
  )
}

export default Hero