"use client";
import { CartItem } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";
import CartProduct from "./CartProduct";

type CartProductsProps = {
  cart: CartItem[];
  fetchCart: () => void;
  setSelected: Dispatch<SetStateAction<CartItem[]>>;
  selected: CartItem[];
};

const CartProducts = ({
  selected,
  cart,
  fetchCart,
  setSelected,
}: CartProductsProps) => {
  const selectAllHandler = () => {
    if (!cart) return;
    if (selected.length === cart.length) {
      setSelected([]);
    } else {
      setSelected(cart.map((item) => item));
    }
  };

  return (
    <div className="flex flex-col gap-y-[32px]">
      <div className="flex gap-x-[16px] ">
        <input
          onChange={() => selectAllHandler()}
          checked={selected.length === cart.length}
          type="checkbox"
          className="min-w-[26px] min-h-[26px]  accent-primary-400"
        ></input>
        <p className="text-[16px] text-neutral-50 font-medium">Select All</p>
      </div>
      <div className="flex flex-col gap-y-[32px]">
        {cart.map((item) => (
          <CartProduct
            selected={selected}
            setSelected={setSelected}
            fetchCart={fetchCart}
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default CartProducts;
