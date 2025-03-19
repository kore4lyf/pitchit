
import React from 'react'
import SearchFormReset from "./SearchFormReset"
import { Button } from "@/components/ui/button"

const SearchForm = ({ query }:{ query: string | undefined}) => {

  return (
    <form action="/" className="search-form border border-1 border-gray-200 rounded-lg flex">
      <input name="query" defaultValue={query} placeholder="Search" className="search-input" />

      <div className="flex gap-2">
        { query &&  <SearchFormReset/>}
        <Button type="submit"></Button>
      </div>
    </form>

  )
}

export default SearchForm