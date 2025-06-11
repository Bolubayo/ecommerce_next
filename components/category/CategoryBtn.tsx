"use client"
import React from 'react'
import Image from "next/image"
import { Category } from '@/lib/type'
import { BASE_URL } from '@/lib/api'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const CategoryBtn = ({ cat }: { cat: Category }) => {
  
  const pathName = usePathname()
  const btnPath = `/categories/${cat.slug}`

  return (
    <Link href={`/categories/${cat.slug}`}>
      <button className={cn("cat-btn cursor-pointer", pathName == btnPath ? "bg-black": "bg-gradient-to-r from-gray-100 to-gray-200")}>
        {/* Icon Container */}
        <div className="w-[40px] h-[40px] bg-white rounded-full overflow-hidden flex items-center justify-center shadow-sm">
          <Image
            src={`${BASE_URL}${cat.image}`}
            width={30}
            height={30}
            className="object-contain"
            alt="thumbnail"
          />
        </div>

        {/* Category Name */}
        <p className={cn("font-semibold text-gray-800 text-[16px]", pathName == btnPath ? "text-white": "text-gray-800")}>{cat.name}</p>
        </button>
      </Link>
  )
}

export default CategoryBtn