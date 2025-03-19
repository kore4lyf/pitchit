"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const SearchFormReset = () => {
  
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement

    if(form) form.reset()
  }

  return (
    <Button type="reset" variant="ghost" className="text-red-600 bg-none box" onClick={reset}>
      <X/>
    </Button>
  )
}

export default SearchFormReset