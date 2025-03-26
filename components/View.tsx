import React from 'react'
import Ping from "./ping"
import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"

const View = async ({ id }: { id: string}) => {
  const { views: totalViews } = await client.withConfig({
    useCdn: false
  }).fetch(STARTUP_VIEWS_QUERY, { id })



  return (
    <div className="">
      <div className="absolute -top-2 -right-2">
        <Ping />

        <p className="text-bold bg-gray-50 rounded-lg">
          {totalViews} {totalViews <= 1 ? "View" : "Views"}
        </p>
      </div>
    </div>
  )
}

export default View