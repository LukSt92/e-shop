import { Product } from "@/app/lib/types";
import Image from "next/image";
import React from "react";
import Badge from "./Badge";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <div className="w-[300px] h-[386px] pt-[16px] pb-[20px] px-[16px] bg-neutral-900 border rounded-md border-gray-400 flex flex-col">
      <div className="relative w-full h-50 mb-[18px]">
        <Image
          src={data.imageUrls[0]}
          alt={data.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 268px"
          priority
        />
      </div>
      <Badge title={data.category.name} />
      <p className="text-[18px] text-neutral-50 pt-[16px] pb-[8px]">
        {data.name}
      </p>
      <p className="text-[28px] text-neutral-50 font-semibold">{data.price}</p>
    </div>
  );
};

export default ProductCard;
