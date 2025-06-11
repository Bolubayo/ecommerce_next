"use client"

import React, { useState } from 'react'
import Button from '../uiComponents/Button'
import { useCart } from '@/context/CartContext'
import { initiatePayment } from '@/lib/api'


const CartSummary = ({ total, loggedInUserEmail }: { total: number, loggedInUserEmail: string | null | undefined }) => {
  
  const tax = 5
  const sub_total = Number(total)
  const cart_total = (tax + sub_total).toFixed(2)

  const formattedTax = tax.toFixed(2)
  const formattedSubtotal = sub_total.toFixed(2)

  const [initiatePaymentLoader, setInitiatePaymentLoader] = useState(false)

  const {cartCode} = useCart()

  async function handleInitiatePayment(){
    const paymentInfo = { email: loggedInUserEmail, cart_code: cartCode }
    setInitiatePaymentLoader(true)

    try {
      const response = await initiatePayment(paymentInfo)
      console.log(response)
      window.location.href = response.data.url
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("An unknown error occurred.");
    }
    finally {
      setInitiatePaymentLoader(false)
    }
  }

  return (
    <div className="w-[400px] max-lg:w-full border border-gray-200 rounded-lg shadow-md bg-white px-8 py-6">
        <h2 className="font-semibold text-2xl text-gray-800 mb-6">Order Summary</h2>

        <div className="w-full flex items-center justify-between py-2">
        <p className="text-gray-600 font-medium">Subtotal</p>
        <p className="text-gray-800 font-semibold">${formattedSubtotal}</p>
        </div>

        <div className="w-full flex items-center justify-between py-2">
        <p className="text-gray-500 font-medium">Estimated Tax</p>
        <p className="text-gray-800 font-semibold">${formattedTax}</p>
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="w-full flex items-center justify-between py-2">
        <p className="text-lg font-semibold text-gray-800">Total</p>
        <p className="text-lg font-bold text-black">${cart_total}</p>
        </div>

    

        {<Button className='checkout-btn' handleClick={handleInitiatePayment} disabled={!Boolean(loggedInUserEmail) || total < 0 || initiatePaymentLoader}>
        {loggedInUserEmail ? initiatePaymentLoader ? "Redirecting to Stripe" : "Proceed to Checkout" : "Login to proceed to Checkout"}
        </Button>}

    </div>
  )
}

export default CartSummary