import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import Link from "next/link"
import { EyeIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { AvatarImage } from "./ui/avatar"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Author, Startup } from "@/sanity.types"
import { Startup_Query } from "@/sanity.types-copy"

export type StartupTypeCard = Omit<Startup, "author"> & { author: Author }

const StartupCard = ({ post }: { post: Startup_Query }) => {
  const { _createdAt, views, title, category, author, _id, image, description } = post

  return (
    <li>
      <Card className="w-full md:max-w-[380px] md:min-w-[280px] rounded-lg">
        <CardHeader>
          <Badge className="w-fit mb-2" variant="secondary">{category?.toUpperCase()}</Badge>
          <div className="flex gap-3 items-center">
            <Link href={`/user/${author?._id}`}>
              <Avatar>
                <AvatarImage src={author?.image || "/images/no-image.png"} className="w-10 h-10 rounded_full outline outline-2 outline-gray-300 hover:outline-customTeal outline-offset-1"/>
                <AvatarFallback className="border rounded_full p-2">{author?.name !== undefined && author.name?.slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1">
              <CardTitle>
                <Link className="hover:text-customTeal" href={`/startup/${_id}`}>
                  {title}
                </Link>
                </CardTitle>
              <CardDescription className=" flex justify-between"> 
              <Link className="hover:text-customTeal" href={`/user/${author?._id}`}>{author?.name}</Link>
                <span>{formatDate(_createdAt)}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3">{description}</p>
          <br/>
          <Image className="rounded-md object-cover h-[200px] w-full" src={image || "/images/no-image.png"} width={200} height={200} alt={`A photo of ${title} submitted {name}`}/>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild>
            <Link href={`./startup/${_id}`}> View
            </Link>
          </Button>

          <div className="flex gap-1">
            <EyeIcon className="size-5" />
            <span className="text-sm">{views}</span>
          </div>
        </CardFooter>
      </Card>
    </li>
  )
}

export default StartupCard