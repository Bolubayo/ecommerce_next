import React from 'react'
import IndividualOrder from './IndividualOrder'
import { PackageSearch } from 'lucide-react'
import { getOrders } from '@/lib/api'
import { auth } from '@/auth'
import { OrderType } from '@/lib/type'
import { redirect } from 'next/navigation'


  const OrderContainer = async () => {

    const session = await auth()
    const loggedInUserEmail = session?.user?.email
    const orders = await getOrders(loggedInUserEmail)

    if (!session) {
      redirect("/")
    }


    if (!orders || orders.length == 0) {
      return (
        <div className="w-full py-20 text-center bg-gray-50 rounded-lg">
          <div className='flex flex-col items-center space-y-4'>
            <div className='bg-white p-4 rounded-full shadow'>
              <PackageSearch className='w-10 h-10 text-gray-400' />
            </div>
            <h2 className='text-2xl font-semibold text-gray-700'>
              No Orders Yet
            </h2>
            <p className="text-gray-500 max-w-md">
              Looks like you haven't placed any orders yet. When you do, they'll appear here.
            </p>
          </div>
        </div>
      );
    }
  
    return (
      <section className='main-max-width mx-auto padding-x py-12'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 max-sm:text-xl'>
            Your Purchased Orders
          </h2>
            <p className='text-gray-600 mt-2 text-base max-x-md mx-auto'>
              Here are all the items you&apos; ve successfully ordered. Track them with ease.
            </p>
        </div>
      <div className="w-full max-h-[500px] overflow-y-auto px-6 py-4 bg-white rounded-xl shadow-md space-y-6">
        {orders.map((order: OrderType) => <IndividualOrder key={order.id} order={order} />)}
        </div>
        
        </section>
    )
  }
export default OrderContainer