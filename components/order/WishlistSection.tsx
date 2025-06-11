import React from 'react'
import MiniProductCard from "./MiniProductCard";
import { HeartOff } from "lucide-react";
import { auth } from '@/auth';
import { getWishlists } from '@/lib/api';
import { WishlistType } from '@/lib/type';

const WishlistSection = async () => {

    const session = await auth()
    const email = session?.user?.email
    const wishlists = await getWishlists(email);
    
    if (!wishlists) {
        return (
            <section className="main-max-width padding-x mx-auto my-16 text-center bg-white p-10 rounded-xl shadow-sm">
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-red-100 p-4 rounded-full shadow">
                        <HeartOff className="h-8 w-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-600 max-w-md">
                        You haven’t added any products to your wishlist yet. Start exploring
                        and save your favorites!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className='main-max-width padding-x mx-auto my-10'>
            <h2 className='text-center text-3xl font-bold text-gray-800 mb-8 max-sm:text-xl'>
                Your Wishlist
            </h2>
            <div>
                {wishlists.map((wishlist: WishlistType) => <MiniProductCard key={wishlist.id} item={wishlist} />)}
            </div>
        </section>
    );
};

export default WishlistSection