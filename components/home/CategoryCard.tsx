import React from 'react'
import Image from "next/image"
import { Category } from '@/lib/type'
import { BASE_URL } from '@/lib/api'
import Link from 'next/link'

const CategoryCard = ({cat}: {cat: Category}) => {
  return (
    <Link href={`/categories/${cat.slug}`}>
      <div className="w-[220px] h-[120px] bg-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer">
        {/* Category Icon */}
        <div className="bg-gray-100 p-3 rounded-full">
          <Image src={`${BASE_URL}${cat.image}`} alt="thumbnail" width={40} height={40} />
        </div>

        {/* Category Name */}
        <p className="font-semibold mt-3 text-gray-800">{cat.name}</p>
      </div>
    </Link>
  )
}

export default CategoryCard