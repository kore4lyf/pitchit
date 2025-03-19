"use client"

import React from 'react'
import { Button } from "@/components/ui/button"

const SearchFormReset = () => {
  
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement

    if(form) form.rest()
  }

  return (
    <Button type="reset" variant="ghost" className="text-red-600 bg-none box" onClick={reset}>x</Button>
  )
}

export default SearchFormReset