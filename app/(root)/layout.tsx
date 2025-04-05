import React from 'react'
import NavBar from "@/components/NavBar"
import { Footer } from "@/components/footer"

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="font-work-sans">
      <NavBar/>
      { children }
      <Footer/>
    </main>
  )
}

export default layout