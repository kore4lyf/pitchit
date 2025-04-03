import React from 'react'
import Ping from "./Ping"
import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import { STARTUP_VIEWS_QUERYResult } from "@/sanity.types"
import { writeClient } from '../sanity/lib/write-client'
// import { unstable_after as after } from "next/server"

const View = async ({ id }: { id: string}) => {
  const { views: totalViews } = await client.withConfig({
    useCdn: false
  }).fetch(STARTUP_VIEWS_QUERY, { id })

  // after(async () => await writeClient
  //   .patch(id)
  //   .set({views: totalViews + 1})
  //   .commit())

  return (
    <div>
      <div className="fixed bottom-5 right-3">

          <Ping />
        <p className="text-bold py-2 px-3 font-bold text-gray-800 bg-teal-100 rounded-lg">
          {totalViews} {totalViews <= 1 ? "View" : "Views"}
        </p>
      </div>
    </div>
  )
}

export default View