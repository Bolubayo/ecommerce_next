import Link from "next/link";
import React from "react";

const SuccessMessage = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 p-6 py-20 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-semibold text-green-900 leading-snug">
          Thank You For Your Purchase!
        </h1>
        <p className="text-lg md:text-xl text-green-800 max-w-2xl mx-auto">
          Your order was placed successfully. We truly appreciate your business
          and will send you updates once your order ships.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/profile">
            <span className="inline-block px-6 py-3 rounded-full bg-green-700 text-white text-base font-medium hover:bg-green-800 transition duration-300">
              View Order
            </span>
          </Link>
          <Link href="/">
            <span className="inline-block px-6 py-3 rounded-full bg-black text-white text-base font-medium hover:bg-gray-800 transition duration-300">
              Continue Shopping
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessMessage;
