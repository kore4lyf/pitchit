import { auth } from "@/auth"
import StartupForm from "@/components/StartupForm"
import { redirect } from "next/navigation"
import React from 'react'

const page = async () => {
  const session = await auth()

  if(!session) redirect("/")

  return (
    <>
      <section className="width_90pct py-5">
        <div className="grid gap-4">
          <h1 className="text-4xl font-bold uppercase">Startup Details</h1>
          <StartupForm/>
        </div>
      </section>
    </>
  )
}

export default page