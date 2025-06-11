import React from 'react'
import Image from "next/image"
import { OrderItemType } from '@/lib/type'
import { BASE_URL } from '@/lib/api'

const MiniProductCard = ({item}: {item: OrderItemType}) => {
  return (
    <div className="w-[220px] bg-white rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col items-center gap-3 px-4 py-5">
    <div className="w-[180px] h-[180px] rounded-lg overflow-hidden border-gray-100 shadow-md mb-4">
      <Image
        src={item?.product?.image ? `${BASE_URL}${item.product.image}`: "/swatch.jpg"}
        className="object-cover w-full h-full"
        width={180}
        height={180}
        alt="Product image"
      />
    </div>
  
    {/* Product Name */}
    <p className="text-center text-lg font-medium text-gray-800 truncate max-w-[180px]">{item?.product?.name}</p>
  
    {/* Product Price */}
    <p className="text-center text-xl font-semibold text-gray-900">${item?.product?.price}</p>
  

  </div>
  
  )
}

export default MiniProductCard