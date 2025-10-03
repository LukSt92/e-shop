"use client";
import { Cart } from "@/lib/types";
import React, { useState } from "react";
import CartProduct from "./CartProduct";
import { useRouter } from "next/navigation";

type CartProductsProps = {
  cart: Cart;
  isChecked: boolean;
};

const CartProducts = ({ cart, isChecked }: CartProductsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const selectAllHandler = async (newSelectAll: boolean) => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isSelectAll: newSelectAll,
        }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating selection:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-[32px]">
      <div className="flex gap-x-[16px] ">
        <input
          disabled={loading}
          onChange={() => selectAllHandler(!isChecked)}
          checked={isChecked}
          type="checkbox"
          className="min-w-[26px] min-h-[26px]  accent-primary-400"
        ></input>
        <p className="text-[16px] text-neutral-50 font-medium">Select All</p>
      </div>
      <div className="flex flex-col gap-y-[32px]">
        {cart.items.map((item) => (
          <CartProduct key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartProducts;
