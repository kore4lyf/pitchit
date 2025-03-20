
import React from 'react'
import { Search } from "lucide-react"
import SearchFormReset from "./SearchFormReset"
import { Button } from "@/components/ui/button"

const SearchForm = ({ query }:{ query: string | undefined}) => {

  return (
    <form action="/" className="w-fit pl-2 search-form border border-1 border-gray-200 rounded-lg flex">
      <input name="query" defaultValue={query} placeholder="Search Startup" className="search-input outline-none focus:outline-none" />

      <div className="flex gap-1">
        { query &&  <SearchFormReset/>}
        <Button type="submit">
          <Search className="size-5 "/>
        </Button>
      </div>
    </form>

  )
}

export default SearchForm