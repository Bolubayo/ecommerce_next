"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { addAddress } from '@/lib/api'
import { toast } from 'react-toastify'
import { AddressType } from '@/lib/type'

const AddressForm = ({ email, address }: {email: string | null |undefined, address: AddressType | undefined}) => {

    const [state, setState] = useState(address?.state ? address.state : "");
    const [city, setCity] = useState(address?.city ? address.city : "");
    const [street, setStreet] = useState(address?.street ? address.street : "");
    const [phone, setPhone] = useState(address?.phone ? address.phone : "");
    const [btnLoader, setBtnLoader] = useState(false);

    function disableButton() {
        if (state.trim().length == 0 || city.trim().length == 0 || street.trim().length == 0 || phone.trim().length == 0) {
            return true;
        }

        return false;
    }

    async function handleAddAddress(e: React.FormEvent<HTMLElement>) {
        e.preventDefault()
        setBtnLoader(true)
        const addressObj = { state, street, phone, city, email }
        
        try {
            await addAddress(addressObj)
            toast.success("Your shipping address has been saved!")
            setState("")
            setPhone("")
            setCity("")
            setStreet("")
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message)
                throw new Error(err.message);
            }
            toast.error("An unknown error occured.");
            throw new Error("An unknown error occured.");
        }
        finally {
            setBtnLoader(false)
        }
    }

  return (
      <form onSubmit={handleAddAddress} className='w-full p-4 rounded-2xl bg-white space-y-6 mx-auto'>
      <h1 className='text-2xl font-semibold text-gray-800 text-center md-6'>Shipping Address</h1>

      <div className='space-y-4'>
          <Input
            placeholder='Street Address'
            value={street}
            onChange={(e)=> setStreet(e.target.value)}
            className='w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
          />
        </div>

        <div className='space-y-1'>
          <Input
            placeholder='City'
            value={city}
            onChange={(e)=> setCity(e.target.value)}
            className='w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
          />
        </div>

        <div className='space-y-1'>
          <Input
            placeholder='State'
            value={state}
            onChange={(e)=> setState(e.target.value)}
            className='w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
          />
        </div>

        <div className='space-y-1'>
          <Input
            placeholder='Phone Number'
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
            className='w-full h-11 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
          />
        </div>

          <button type="submit" disabled={disableButton() || btnLoader} className='w-full h-12 bg-black text-white px-6 py-3 text-sm font-medium rounded-md hover:bg-gray-800 transition-all cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
        {btnLoader ? "Saving Address..." : address?.city ? "Update Address" : "Save Address"}
      </button>
    </form>
  )
}

export default AddressForm