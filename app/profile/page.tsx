import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton'
import AddressFormContainer from '@/components/order/AddressFormContainer'
import OrderContainer from '@/components/order/OrderContainer'
import WishlistSection from '@/components/order/WishlistSection'
import { Suspense } from 'react'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Profile | Daniel Store",
};

const ProfilePage = () => {
  return (
    <>
      <div className='main-max-width padding-x py-6 flex-center mx-auto'>
        {/* <Button className='address-btn'>Add Shipping Address</Button> */}
        <AddressFormContainer />
      </div>

      <Suspense fallback={<ProductSectionSkeleton />}>
        <OrderContainer />
      </Suspense>
      
      <Suspense fallback={<ProductSectionSkeleton />}>
        <WishlistSection />
      </Suspense>
    </>
  )
}

export default ProfilePage