import React from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/type";

interface Props {
  title: string;
  similar_products?: Product[];
  detailPage?: boolean
}

const ProductSection = async ({ title, similar_products, detailPage }: Props) => {
  
  const products = detailPage ? similar_products : await getProducts()

  return (
    <section className="main-max-width padding-x mx-auto my-16">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        {title}
      </h2>

      {/* Content */}
      <div className="flex-center flex-wrap gap-4">
        
        {products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
};

export default ProductSection;