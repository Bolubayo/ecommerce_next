import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="w-[260px] rounded-lg shadow-md bg-white flex flex-col items-center justify-center p-4">
      {/* Product Name Skeleton */}
      <div className="w-36 h-4 bg-gray-300 rounded-md"></div>

      {/* Product Price Skeleton */}
      <div className="w-20 h-5 bg-gray-300 rounded-md"></div>
    </div>
  )
}

export default ProductCardSkeleton