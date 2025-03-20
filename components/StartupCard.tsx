import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import Link from "next/link"
import { EyeIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { AvatarImage } from "./ui/avatar"
import Image from "next/image"

const StartupCard = ({ post }: { post: PostContent }) => {
  const { _createdAt, views, author: { _id: authorId, name}, title, category, _id, image, description } = post

  return (
    <li>
      <Card className="w-full md:max-w-[380px] md:min-w-[280px]rounded-md rounded-lg">
        <CardHeader>
          <Badge className="w-fit mb-2" variant="secondary">{category}</Badge>
          <div className="flex gap-3 items-center">
            <Link href={`/user/${authorId}`}>
              <Avatar>
                <AvatarImage src="/images/profile-pic.png" className="w-10 h-10 rounded_full outline outline-2 outline-gray-300 hover:outline-customTeal outline-offset-1"/>
                <AvatarFallback className="border rounded_full p-2">{name.slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1">
              <CardTitle>
                <Link className="hover:text-customTeal" href={`/startup/${_id}`}>
                  {title}
                </Link>
                </CardTitle>
              <CardDescription className=" flex justify-between"> 
              <Link className="hover:text-customTeal" href={`/user/${authorId}`}>{name}</Link>
                <span>{_createdAt}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
          <br/>
          <Image className="rounded-md object-cover h-[200px] w-full" src={image} width={200} height={200} alt={`A photo of ${title} submitted {name}`}/>
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