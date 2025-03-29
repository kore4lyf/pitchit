"use client"
import React, { useState } from 'react'
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

const StartupForm = () => {
  const [ errors, setErrors ] = useState<Record<string,string>>({})

  return (
    <form action={() => {} } className="grid gap-4 w-full max-w-sm">
      <div className="grid items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="title" id="title" placeholder="Title" required />
        {errors.title && <p className="text-red-600">{errors.title}</p>}
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="title">Description</Label>
        <Textarea id="description" placeholder="Description" required></Textarea>
        {errors.description && <p className="text-red-600">{errors.description}</p>}
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="category">Category</Label>
        <Input name="category" type="category" id="category" placeholder="Category [Health, Tech, Product]" />
        {errors.category && <p className="text-red-600">{errors.category}</p>}
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="link">Image URL</Label>
        <Input type="link" id="link" placeholder="Link" />
        {errors.link && <p className="text-red-600">{errors.link}</p>}
      </div>
    </form>
  )
}

export default StartupForm