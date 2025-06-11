import CategorySection from '@/components/home/CategorySection'
import CategorySectionSkeleton from '@/components/home/CategorySectionSkeleton'
import Hero from '@/components/home/Hero'
import ProductSection from '@/components/home/ProductSection'
import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton'
import React, { Suspense } from 'react'

const HomePage = () => {
  return (
    <>
      <Hero />

      <Suspense fallback={<CategorySectionSkeleton />}>
      <CategorySection />
      </Suspense>

      <Suspense fallback={<ProductSectionSkeleton />}>
      <ProductSection title="Featured Products" />
      </Suspense>
    </>
  )
}

export default HomePage