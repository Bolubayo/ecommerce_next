import React from 'react'
import CategoryCard from './CategoryCard'
import { getCategories } from '@/lib/api'
import { Category } from '@/lib/type'

const CategorySection = async () => {

  const categories = await getCategories()
  // console.log(categories)


  return (
    <section className="main-max-width padding-x mx-auto">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        Browse By Category
      </h2>

      {/* Content */}
      <div className="flex justify-center flex-wrap gap-8">
        {categories.map((cat: Category) => <CategoryCard key={cat.id} cat={cat} />)}

      </div>
    </section>
  )
}

export default CategorySection