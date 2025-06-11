import React from 'react'
import Form from "next/form"
import { Search } from 'lucide-react'

const SearchForm = () => {
  return (
    <Form action="/search" scroll={false} className='search-form'>
        <input
        name="query"
        className="flex-1 font-bold w-full outline-none"
        placeholder="Search Products"
        required
        />
        
        <button type="submit" className="size-[30px] rounded-full bg-black flex justify-center items-center cursor-pointer text-white">
        <Search className="size-4" />
        </button>
    </Form>
  )
}

export default SearchForm