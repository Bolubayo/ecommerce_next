"use client"

import React, { useEffect, useState } from 'react'
import Button from '../uiComponents/Button'
import Image from "next/image"
import { ProductDetail } from '@/lib/type'
import { api, BASE_URL } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import { addToCartAction, addToWishlistAction } from '@/lib/actions'
import { toast } from 'react-toastify'
import WishlistTooltip from '../uiComponents/WishlistTooltip'

const Productinfo = ({ product, loggedInUserEmail }: { product: ProductDetail, loggedInUserEmail:string | null | undefined }) => {

  const { cartCode, setCartItemsCount } = useCart();
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addWishListLoader, setAddWishListLoader] = useState(false)
  
  useEffect(() => {
    async function handleAddedToCart() {
      try {
        const response = await api.get(`product_in_cart?cart_code=${cartCode}&product_id=${product.id}`)
        setAddedToCart(response.data.product_in_cart)
        return response.data
      }

      catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
        throw new Error("An unknown error occurred.");
        }
    }

    handleAddedToCart()
  }, [cartCode, product.id])
  
  async function handleAddToCart() {
    setAddToCartLoader(true)
    const formData = new FormData()
    formData.set("cart_code", cartCode ? cartCode : "")
    formData.set("product_id", String(product.id))

    try {
      const response = await addToCartAction(formData)
      setAddedToCart(true)
      setCartItemsCount(curr => curr + 1)
      toast.success("Item added to cart!");
      return response
    }
    catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred.");
    }
    
    finally {
      setAddToCartLoader(false)
    }
  }

  async function handleAddToWishlist() {
    setAddWishListLoader(true)
    const formData = new FormData()
    formData.set("product_id", String(product.id))
    formData.set("email", loggedInUserEmail ? loggedInUserEmail : "")

    try {
      await addToWishlistAction(formData)
      setAddedToWishlist(curr => !curr)
      toast.success("Your wishlist has been updated!")
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        // toast.error(err.message)
        throw new Error(err.message);
      }
      toast.error("An unknown error occurred.")
      throw new Error("An unknown error occurred.");
    }
    finally {
      setAddWishListLoader(false)
    }
  }

  useEffect(() => {
    async function handleProductInWishlist() {
      if (loggedInUserEmail) {
        try {
          const response = await api.get(`product_in_wishlist?email=${loggedInUserEmail}&product_id=${product.id}`)
          setAddedToWishlist(response.data.product_in_wishlist)
          return response.data
        }
        catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          throw new Error("An unknown error occurred.");
        }
      }
    }
    handleProductInWishlist()
  }, [loggedInUserEmail, product.id])

  return (
    <div className="bg-gray-50 padding-x py-10 flex items-start flex-wrap gap-12 main-max-width padding-x mx-auto">
      {/* Product Image */}
    
      <div className="w-[350px] h-[400px] relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <Image
          src={`${BASE_URL}${product.image}`}
          alt="gaming"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-6 max-w-[500px] max-md:w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <h3 className="text-2xl font-semibold text-black">${product.price}</h3>
          
        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-medium text-lg mb-3">Details</h3>
          <p className="text-gray-600 text-justify leading-6 text-[14px] max-md:text-[12px]">
            {product.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex py-3 items-center gap-4 flex-wrap border">
          {/* Add to Cart Button */}
          <Button
            disabled={addToCartLoader || addedToCart}
            handleClick={handleAddToCart}
            className="default-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addToCartLoader
              ? "Adding to Cart..."
              : addedToCart
              ? "Added to Cart"
              : "Add to Cart"}
          </Button>

          {/* Add to Wishlist Button or Tooltip */}
          {loggedInUserEmail ? (
            <Button
              disabled={addWishListLoader || !product?.id || !loggedInUserEmail}
              handleClick={handleAddToWishlist}
              className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addWishListLoader
                ? "Updating..."
                : addedToWishlist
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </Button>
          ) : (
            <WishlistTooltip loggedInUserEmail={loggedInUserEmail} />
          )}
        </div>

        
      </div>
    </div>
  )
}

export default Productinfo