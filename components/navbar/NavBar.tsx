"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import SearchForm from './SearchForm'
import NavItems from './NavItems'
import MobileNavbar from './MobileNavbar'
import SearchButton from './SearchButton'

interface Props{
  loggedInUser?:{
    name: string;
    email: string;
    image: string;
  }
}

// const Navbar = ({ loggedInUser }: {loggedInUser: User | undefined}) => {
const Navbar = ({ loggedInUser }: Props) => {


    const [showSearchForm, setShowSearchForm] = useState(false)

  const handleSearch = () => {
    setShowSearchForm(curr => !curr)    
  }
  return (
    <>
    <nav className="bg-[whitesmoke] sticky top-0 z-20 w-full py-4">
        <div className='flex justify-between items-center main-max-width mx-auto padding-x'>
            <Link href="/">
              <h1 className='text-2xl font-extrabold text-gray-900'>Daniel Shop</h1>
            </Link>
              
            <div className='max-lg:hidden'>
              <SearchForm />
            </div>
            
            <div className='max-lg:block hidden'>
            <SearchButton handleSearch={handleSearch} showSearchForm={showSearchForm} />
            </div>
            
            <div className='max-md:hidden'>
            <NavItems loggedInUser={loggedInUser} />
            </div>
            
            <div className='max-md:block hidden'>
              <MobileNavbar loggedInUser={loggedInUser} />
            </div>
        </div>
    </nav>
    
   {showSearchForm && <div className='w-[300px] mx-auto max-lg:block hidden'>
      <SearchForm />
    </div>}
    
    </>
  )
}

export default Navbar




