import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from 'react'

const Hero = () => {
  return (
    <section className="hero">
        <div className="width_90pct grid grid-cols-1 md:grid-cols-2 md:gap-5 xl:gap-0 mx-auto items-center h-screen">
          {/* <Image src="/images/pitchit-hero0.png" width={600} height={200} alt="An illustration of a person doing a pitch" className="object-contain" /> */}
          <div className="bg-[url('/images/pitchit-hero0.png')] bg-no-repeat bg-center h-screen w-full"></div>
          <div className="flex-1">
            <h1 className="uppercase min-w-[12ch] text-3xl font-work-sans font-extrabold text-black-200 sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px]"> Connect with investors </h1>
            <p className="text-gray-700 py-6"> Narrate your ideas, submit them and get noticed.</p>
            <Button>Get Started</Button>
          </div>
        </div>
      </section>

      
  )
}

export default Hero