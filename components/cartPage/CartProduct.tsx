"use client";
import { CartItem } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import Badge from "../shared/Badge";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon";
import { useRouter } from "next/navigation";

type CartProductProps = {
  item: CartItem;
};

const CartProduct = ({ item }: CartProductProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const selectHandler = async (newSelect: boolean) => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item.id,
          isSelect: newSelect,
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

  const quantityHandler = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.product.stock) return;

    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item.id,
          quantity: newQuantity,
        }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-x-[24px] items-center">
      <input
        onChange={() => selectHandler(!item.isSelect)}
        checked={item.isSelect}
        type="checkbox"
        className="min-w-[26px] min-h-[26px]  accent-primary-400"
      />
      <div className="flex flex-col p-[24px] border rounded-md border-border bg-footer min-w-full max-[1200px]:min-w-9/10">
        <div className="flex gap-x-[32px] max-[700px]:flex-col max-[700px]:items-center">
          <Image
            src={item.product.imageUrls[0]}
            alt={item.product.name}
            width={148}
            height={114}
            className="border rounded-md"
          />
          <div className="flex flex-col w-full">
            <div className="flex justify-between pb-[12px]">
              <p className="text-[20px] text-neutral-50 font-medium text-wrap">
                {item.product.name}
              </p>
              <div className="cursor-pointer" onClick={() => removeItem()}>
                <TrashIcon />
              </div>
            </div>
            <Badge title={item.product.category.name} />
            <div className="flex justify-between">
              <p className="pt-[16px] text-[24px] text-neutral-50 font-medium">
                {Number(item.product.price).toFixed(2)}
              </p>
              <div className="flex border border-neutral-50 rounded-md px-[20px] py-[14px] gap-x-[14px]">
                <div
                  aria-disabled={loading || item.quantity <= 1}
                  onClick={() => quantityHandler(item.quantity - 1)}
                >
                  <MinusIcon />
                </div>
                <p className="text-[16px] font-medium text-neutral-50">
                  {item.quantity}
                </p>
                <div
                  aria-disabled={loading || item.quantity >= item.product.stock}
                  onClick={() => quantityHandler(item.quantity + 1)}
                >
                  <PlusIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
