"use client";
import React, { useState } from "react";
import Button from "../shared/Button";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import CartIcon from "../icons/CartIcon";
import { addToCart } from "@/services/addToCart";

type DetailerProps = {
  stock: number;
  price: number;
  id: number;
};

const Detailer = ({ stock, price, id }: DetailerProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const quantityHandler = (add: boolean) => {
    if (add) {
      if (quantity === stock) setQuantity(quantity);
      else setQuantity(quantity + 1);
    } else {
      if (quantity === 1) setQuantity(quantity);
      else setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-[423px] border border-border rounded-md bg-neutral-900 p-[24px] flex flex-col gap-y-[32px] max-h-fit">
      <div className="flex flex-col gap-y-[14px]">
        <p className="text-[18px] text-neutral-300 font-medium">Colors</p>
        <div className="flex gap-x-[16px]">
          {/* TODO dodać możliwość wyboru koloru  */}
          <div className="w-[54px] h-[54px] bg-neutral-50 border border-border rounded-md " />
          <div className="w-[54px] h-[54px] text-footer border border-border rounded-md " />
        </div>
      </div>
      <div className="flex flex-col gap-y-[14px]">
        <p className="text-[18px] text-neutral-300 font-medium">Quantity</p>
        <div className="flex gap-x-[16px] items-center">
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
          <div className="flex gap-x-[6px]">
            <p className="text-[16px] text-neutral-50 font-medium">Stock:</p>
            <p className="text-[16px] text-neutral-50 font-medium">{stock}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[18px] text-neutral-300 font-medium">Subtotal</p>
        <p className="text-[28px] text-neutral-50 font-medium">
          {(quantity * price).toFixed(2)}
        </p>
      </div>
      <Button
        style="stroke"
        size="XXL"
        fit={false}
        onClick={() => addToCart(id, quantity)}
      >
        Add to Cart
        <CartIcon color="#ee701d" />
      </Button>
    </div>
  );
};

export default Detailer;
