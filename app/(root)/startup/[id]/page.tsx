import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import React, { Suspense } from 'react'
import { formatDate } from '@/lib/utils';
import { Clock, EyeIcon } from "lucide-react"
import Image from "next/image"
import MarkdownIt from "markdown-it"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"

export const experimental_ppr = true

const md = MarkdownIt()

const page = async ({ params }: { params: Promise<{ id: string }>}) => {
  const id  = (await params).id

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })
  if(!post) return notFound()

  const { _id, title, _createdAt, views, description, category, image, pitch, author: {
    _id: authorId,
    name,
    image: authorImage,
    bio
  }} = post

  const parsedContent = md.render(pitch) || ""

  return (
    <>
      <section className="width_90pct py-4">
        <div className="grid gap-4">
          <div> <Badge variant="secondary">{category}</Badge> </div>
          <h1 className="text-5xl font-bold">{post.title}</h1>
          
          <div className="text-gray-500 flex gap-4 items-center">
            <p className="flex gap-1">
              <Avatar className="w-fit h-fit">
                <AvatarImage src={authorImage} className="w-7 h-7 rounded_full outline outline-2 outline-gray-300 hover:outline-customTeal outline-offset-1"/>
                <AvatarFallback className="border rounded_full p-2 w-7 h-7">{name !== undefined && name.slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-black-200 font-bold">{name}</span>
            </p> 

            <span>|</span>
            <p className="flex gap-2 items-center">
              <Clock  className="size-4"/>
              <span>{formatDate(_createdAt)}</span>
            </p>

            <span>|</span>
            <div className="flex gap-1 items-center">
              <EyeIcon className="size-4 text-gray-500"/>
              <span className="text-sm">{views}</span>
            </div>
          </div>

          <div>
            <div className="md:w-[600px] bg-gray-100 rounded-lg">
              <Image src={image} width={200} height={200} alt={`A description ${title}`} className="rounded-t-lg w-full" />
              <p className="m-4 p-2 pb-6">{description}</p>
            </div>

            { parsedContent ? <article className="prose font-work-sans" dangerouslySetInnerHTML={{ __html: parsedContent }} /> : <span> No details provide </span> }
          </div>
        </div>
      </section>

      {/* <section className="grid gap-6">
        <h3 className="text-2xl">Recommended Posts</h3>
        <div className="grid">
          <Card>
            <CardContent className="grid gl">
              <Image src={%} width={200} height={200} alt={`Description of ${%}`} />
              <div><Badge variant="secondary">{%}</Badge></div>
              <p className="text-xl font-bold">{%}</p>
            </CardContent>
            <div className="flex gap-1">
              <Clock  className="size-4"/> {%}
            </div>
          </Card>
        </div>
      </section> */}

      <Suspense fallback={<Skeleton className="w-fit" />}>
       <View id={id} />
      </Suspense>
    </>
  )
}

export default page