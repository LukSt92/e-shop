"use client";
import { CartItem } from "@/app/lib/types";
import Image from "next/image";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import Badge from "../shared/Badge";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import TrashIcon from "../icons/TrashIcon";

type CartProductProps = {
  item: CartItem;
  fetchCart: () => void;
  setSelected: Dispatch<SetStateAction<CartItem[]>>;
  selected: CartItem[];
};

const CartProduct = ({
  selected,
  item,
  fetchCart,
  setSelected,
}: CartProductProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const selectHandler = () => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const quantityHandler = (add: boolean) => {
    if (add) {
      if (quantity === item.product.stock) setQuantity(quantity);
      else setQuantity(quantity + 1);
    } else {
      if (quantity === 1) setQuantity(quantity);
      else setQuantity(quantity - 1);
    }
  };

  const updateCart = async (itemId: number, newQty: number) => {
    if (newQty < 1) return;
    await fetch(`/api/cart/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: itemId, quantity: newQty }),
    });
  };

  const removeItem = async (itemId: number) => {
    await fetch(`/api/cart/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: itemId }),
    });
    fetchCart();
  };

  useEffect(() => {
    if (quantity !== item.quantity) updateCart(item.id, quantity);
  }, [item.id, quantity, item.quantity]);

  return (
    <div className="flex gap-x-[24px] items-center">
      <input
        onChange={() => selectHandler()}
        checked={selected.includes(item)}
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
              <div
                className="cursor-pointer"
                onClick={() => removeItem(item.id)}
              >
                <TrashIcon />
              </div>
            </div>
            <Badge title={item.product.category.name} />
            <div className="flex justify-between">
              <p className="pt-[16px] text-[24px] text-neutral-50 font-medium">
                {Number(item.product.price).toFixed(2)}
              </p>
              <div className="flex border border-neutral-50 rounded-md px-[20px] py-[14px] gap-x-[14px]">
                <div onClick={() => quantityHandler(false)}>
                  <MinusIcon />
                </div>
                <p className="text-[16px] font-medium text-neutral-50">
                  {quantity}
                </p>
                <div onClick={() => quantityHandler(true)}>
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
