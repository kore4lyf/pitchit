"use client"
import React, { useActionState, useState } from 'react'
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import MDEditor from "@uiw/react-md-editor"
import { useFormStatus } from "react-dom"
import { formSchema } from "@/lib/validation"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { redirect } from "next/navigation"
import { createPitch } from "@/lib/actions"
import { useRouter } from "next/navigation"


const StartupForm = () => {
  const router = useRouter()
  const [ errors, setErrors ] = useState<Record<string,string>>({})
  const [ pitch, setPitch ] = useState("")
  const { toast } = useToast()

  toast({
    description: "Your startup pitch has been created successfully",
    variant: "success"
  })

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    console.log("Pitch: ", pitch)
    
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }

      await formSchema.parseAsync(formValues)

      const result = await createPitch(prevState, formData, pitch)
      

      if(result.status == "SUCCESS") {
        toast({
          description: "Your startup pitch has been created successfully"
        })

       router.push(`/startup/${result._id}`)
      }

      
      toast({
        description: "Your startup pitch has been created successfully"
      })
      
      return result

    } catch (error) {
      if(error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors

        setErrors(fieldErrors as unknown as Record<string, string>)

        toast({
          description: "Please check your inputs and try again",
          variant: "destructive"
        })

        return {...prevState, error: "validation failed", status: "ERROR"}
      }

      toast({
        description: "An unexpected error has occurred" + ` ${(error as unknown as string).toString()}`,
        variant: "destructive"
      })

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR"
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL"
  })

  setInterval(() => console.log(pitch), 1000)
  return (
    <form action={formAction} className="grid gap-8 w-full max-w-3xl">
      <div className="grid items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <Input name="title" type="text" id="title" placeholder="Title" required />
        {errors.title && <p className="text-red-600">{errors.title}</p>}
      </div>
      <div className="grid items-center gap-2 w-full max-w-sm">
        <Label htmlFor="category">Category</Label>
        <Input name="category" type="text" id="category" placeholder="Category e.g. Health, Tech, Product]" />
        {errors.category && <p className="text-red-600">{errors.category}</p>}
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="title">Description</Label>
        <Textarea name="description" id="description" className="min-h-28" placeholder="Description" required></Textarea>
        {errors.description && <p className="text-red-600">{errors.description}</p>}
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="link">Image URL</Label>
        <Input type="text" name="link" id="link" placeholder="Link" />
        {errors.link && <p className="text-red-600">{errors.link}</p>}
      </div>
      <div className="grid items-center gap-2" data-color-mode="light">
        <Label htmlFor="pitch">Pitch</Label>
        <MDEditor value={pitch} 
        onChange={(value) => setPitch(value as string)} 
        id="pitch"
        preview="edit" height={300} 
        style={{ borderRadius: 5, overflow: "hidden"}} 
        textareaProps={{
          placeholder: "Describe your startup idea and what problem it solves."
        }}
        previewOptions={{
          disallowedElements: ["style"]
        }}  />
        {errors.pitch && <p className="text-red-600">{errors.pitch}</p>}
      </div>

      <div>
        <Button type="submit" disabled={isPending}>{ isPending ? "Submitting..." : "Submit" } </Button>
      </div>
    </form>
  )
}

export default StartupForm