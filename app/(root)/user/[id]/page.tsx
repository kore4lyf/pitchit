import { auth } from "@/auth"
import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries"
import { Github, Mail } from "lucide-react"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import React from 'react'
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import UserStartups from "@/components/UserStartups"

const page = async ({ params }: { params: Promise<{ id: string }>}) => {
  const id = (await params).id
  const session = await auth()

  if(!session) redirect("/")

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id })

  if(!user) return notFound()

  const {name, username, email, image, bio, _id } = user

  return (
    <>
      <section className="profile_container grid gap-5 pb-4 pt-10 width_90pct">

        <h1 className="mt-2 text-4xl uppercase pb-5 font-bold text-gray-800"> Profile </h1>
        <Card className="pb-3 pt-8 mx-auto w-full max-w-[400px] rounded-lg">
          <CardContent className="w-full flex flex-col items-center">
            <Image
              src={image || "/images/no-image.png"}
              alt={name || "A close photograph of the user"}
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-lg"/>
            <p className="mt-4 text-2xl font-bold text-gray-800">{name}</p>
            <p className="text-gray-500">@{username}</p>
            <p className="mt-4 text-center text-gray-600">{bio}</p>

            <div className="mt-6 flex items-center space-x-4">
              <Link href={`mailto:${email}`} className="flex items-center text-gray-600 hover:text-gray-800">
                <Mail className="w-5 h-5 mr-2" /> <span className="hover:text-primary">{email}</span>
              </Link>
              <Link
                href={`https://github.com/${username}`}
                target="_blank"
                className="flex items-center text-gray-600 hover:text-gray-800">
                <Github className="w-5 h-5 mr-2" /> <span className="hover:text-primary">GitHub</span>
              </Link>
            </div>
          </CardContent>
          </Card>

          <h3 className="text-2xl mt-8 font-bold uppercase">Startups</h3>
          <UserStartups id={id}/>
      </section>
    </>
  )
}

export default page