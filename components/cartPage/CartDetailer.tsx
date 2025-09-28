import React from "react";
import Button from "../shared/Button";

type CartDetailerProps = {
  totalQuantity: number;
  totalPrice: number;
};

const CartDetailer = ({ totalQuantity, totalPrice }: CartDetailerProps) => {
  return (
    <div className="flex flex-col w-[423px] max-h-fit p-[24px] bg-neutral-900 border border-border rounded-md max-[500px]:w-[350px] max-[1200px]:self-center">
      <p className="text-[18px] text-neutral-50 font-medium pb-[16px]">
        Total Product
      </p>
      <div className="flex justify-between pb-[24px] border-b border-border">
        <p className="text-[16px] text-neutral-100 font-medium ">
          Total Product Price ({totalQuantity} Item)
        </p>
        <p>{totalPrice}</p>
      </div>
      <div className="pt-[24px]">
        <div className="flex justify-between items-center pb-[32px]">
          <p className="text-[18px] text-neutral-50 font-medium">Subtotal</p>
          <p className="text-[28px] text-neutral-50 font-medium">
            {totalPrice}
          </p>
        </div>
        <Button style="fill" size="XL" fit={false}>
          <p className="text-[16px] text-neutral-900 font-medium ">Checkout</p>
        </Button>
      </div>
    </div>
  );
};

export default CartDetailer;
