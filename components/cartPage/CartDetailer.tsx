"use client";
import React from "react";
import Button from "../shared/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

type CartDetailerProps = {
  totalQuantity: number;
  totalPrice: number;
};

const CartDetailer = ({ totalQuantity, totalPrice }: CartDetailerProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
      });

      if (res.ok) {
        router.push(`/`);
        enqueueSnackbar("Order has been placed!", { variant: "success" });
      } else {
        enqueueSnackbar("Select items to place order", { variant: "warning" });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[423px] max-h-fit p-[24px] bg-neutral-900 border border-border rounded-md max-[500px]:w-[350px] max-[1200px]:self-center">
      <p className="text-[18px] text-neutral-50 font-medium pb-[16px]">
        Total Product
      </p>
      <div className="flex justify-between pb-[24px] border-b border-border">
        <p className="text-[16px] text-neutral-100 font-medium ">
          Total Product Price ({totalQuantity} Item)
        </p>
        <p>{totalPrice.toFixed(2)}</p>
      </div>
      <div className="pt-[24px]">
        <div className="flex justify-between items-center pb-[32px]">
          <p className="text-[18px] text-neutral-50 font-medium">Subtotal</p>
          <p className="text-[28px] text-neutral-50 font-medium">
            {totalPrice.toFixed(2)}
          </p>
        </div>
        <Button
          style="fill"
          size="XL"
          fit={false}
          onClick={handleCheckout}
          disabled={loading}
        >
          <p className="text-[16px] text-neutral-900 font-medium ">
            {loading ? "Processing" : "Checkout"}
          </p>
        </Button>
      </div>
    </div>
  );
};

export default CartDetailer;
