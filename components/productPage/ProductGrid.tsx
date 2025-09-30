import { Product } from "@/lib/types";
import React from "react";
import ProductCard from "../shared/ProductCard";

type ProductGridProps = {
  data: Product[];
};

const ProductGrid = ({ data }: ProductGridProps) => {
  return (
    <div className="flex flex-wrap gap-y-[32px] gap-x-[48px] p-[40px]">
      {data.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
