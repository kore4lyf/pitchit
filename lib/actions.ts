"use server"

import { auth } from "@/auth"
import { json } from "stream/consumers"
import { getImageBase64, parseServerActionResponse } from "./utils"
import slugify from "slugify"
import { writeClient } from "@/sanity/lib/write-client"
import { redirect } from "next/navigation"

export const createPitch = async(state: any, form: FormData, pitch: string) => {
  const session = await auth()

  if(!session) return parseServerActionResponse({
    error: "Not signed in", 
    status: "ERROR"})

  const {title, description, category, link, } = Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"))

  const slug = slugify(title as string, { lower: true, strict: true})

  const startupImage = await getImageBase64(link as string)

  try {
    const startup = {
      title, 
      description,
      category,
      image: startupImage,
      slug: {
        _type: slug,
        current: slug
      },
      author: {
        _type: "reference",
        _ref: session?.id
      },
      pitch
    }

    const result = await writeClient.create({_type: "startup", ...startup})

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS"
    })
    
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR"
    })
  }
}

export const redirectTo = async (path: string) => {
  await redirect(path)
}