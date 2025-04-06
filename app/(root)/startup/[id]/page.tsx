import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { client } from "@/sanity/lib/client"
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import React, { Suspense } from 'react'
import { formatDate } from '@/lib/utils';
import { Clock } from "lucide-react"
import Image from "next/image"
import MarkdownIt from "markdown-it"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"
import Link from "next/link"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"
import { Startup_Query } from "@/sanity.types-copy"
import { STARTUP_QUERY } from '../../../../sanity/lib/queries';

export const experimental_ppr = true

const md = MarkdownIt()

const page = async ({ params }: { params: Promise<{ id: string }>}) => {
  const id  = (await params).id

  const [post, {select: editorPosts}] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "recommendations"})
  ])

  if(!post) return notFound()

  const {title, _createdAt, description, category, image, pitch, author: {
    _id: authorId,
    name,
    image: authorImage,
  }} = post

  const parsedContent = md.render(pitch || "")

  return (
    <>
      <section className="width_90pct py-5">
        <div className="grid gap-4">
          <div> <Badge variant="secondary">{category && category.toUpperCase()}</Badge> </div>
          <h1 className="text-4xl font-bold uppercase font-work-sans">{post.title}</h1>
          
          <div className="text-gray-500 flex gap-4 items-center">
            <Link href={`/user/${authorId}`} className="flex gap-2 hover:text-primary">
              <Avatar className="w-fit h-fit">
                <AvatarImage src={authorImage} className="w-7 h-7 rounded_full outline outline-2 outline-gray-300 hover:outline-customTeal outline-offset-1"/>
                <AvatarFallback className="border rounded_full p-2 w-7 h-7">{name !== undefined && name.slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-black-200 font-bold">{name}</span>
            </Link> 

            <span>|</span>
            <p className="flex gap-2 items-center">
              <Clock  className="size-4"/>
              <span>{formatDate(_createdAt)}</span>
            </p>
          </div>

          <div>
            <div className="grid md:w-[600px] bg-green-100 rounded-lg mt-2 overflow-hidden">
              <Image src={image || "/images/no-image.png"} width={200} height={200} alt={`A description ${title}`} className="rounded-t-lg w-full" />
              <p className="m-4 p-2 pb-6">{description}</p>
            </div>

            <div className=" pt-6">
            { parsedContent ? <article className="max-w-[800px] prose font-work-sans" dangerouslySetInnerHTML={{ __html: parsedContent }} /> : <span> No details provide </span> }
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 width_90pct py-5">
        <h3 className="text-3xl uppercase font-bold">Recommended Startups</h3>
        <ul className="grid list-style-none">
          {editorPosts?.length > 0 && 
            editorPosts.map((post: Startup_Query) => (
              <StartupCard key={post._id} post={post}/>
        ))}
        </ul>
      </section>

      <Suspense fallback={<Skeleton className="w-fit" />}>
        <View id={id} />
      </Suspense>
    </>
  )
}

export default page