"use client";
import { Product } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import Badge from "./Badge";
import Link from "next/link";
import CartIcon from "../icons/CartIcon";
import { enqueueSnackbar } from "notistack";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddToCart = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: data.id,
          quantity: 1,
        }),
      });

      if (res.ok) {
        enqueueSnackbar("Product Successfully Added", { variant: "success" });
      } else {
        const data = await res.json();
        alert(data.message || "Error occured while adding to cart");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-[300px] h-[386px] pt-[16px] pb-[20px] px-[16px] bg-neutral-900 border rounded-md border-border flex flex-col">
      <Link href={`/product/${data.id}`}>
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
        <p className="text-[28px] text-neutral-50 font-semibold">
          {parseFloat(data.price.toString())}
        </p>
      </Link>
      <div
        aria-disabled={loading}
        onClick={() => handleAddToCart()}
        className="bg-neutral-900 rounded-md w-[32px] h-[32px] p-[4px] absolute m-[16px] cursor-pointer"
      >
        <CartIcon color="#FCFCFC" />
      </div>
    </div>
  );
};

export default ProductCard;
