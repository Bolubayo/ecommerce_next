import { auth } from '@/auth'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { getCart } from '@/lib/api'
import { CartType } from '@/lib/type'
import React from 'react';
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Cart | Daniel Store",
  description: "",
};

const CartItemPage = async ({params}: {params: Promise<{cartcode: string}>}) => {

    const {cartcode} = await params
    const cart:CartType = await getCart(cartcode)
    const cartitems = cart.cartitems
    
    const cartitems_count = cart.cartitems.length;
    const total = cart.cart_total
    
    const session = await auth()
    const loggedInUserEmail = session?.user?.email

  return (
    <div className="main-max-width padding-x mx-auto py-9">
      <h1 className="font-semibold text-2xl text-gray-800 mb-6">Cart</h1>

      <div className="flex flex-wrap gap-6 lg:gap-8 justify-between w-full">
        {/* Cartitem */}
        <div className="w-[600px] max-lg:w-full border border-gray-200 shadow-sm rounded-lg bg-white overflow-hidden flex-1">
          <div className="max-h-[400px] overflow-y-auto px-6 py-4">
            {cartitems_count > 0 ? (cartitems.map((cartitem)=><CartItem key={cartitem.id} cartitem={cartitem} />)) : <p className="text-center text-gray-500 py-10">Your cart is empty.</p>}

            {/* <CartItem />
            <CartItem />
            <CartItem /> */}
          </div>
        </div>
        {/* Cartitem */}

        <CartSummary total={total} loggedInUserEmail={loggedInUserEmail} />
      </div>
    </div>
  )
}

export default CartItemPage