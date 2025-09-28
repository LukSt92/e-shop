"use client";
import React, { useEffect, useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import { Category } from "@/lib/types";
import { capFirstLet } from "@/utilis/capFirstLet";
import CurrencyInput from "react-currency-input-field";
import { useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  data: Category[];
};

const Filter = ({ data }: FilterProps) => {
  const [selectedCat, setSelectedCat] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<string>();
  const [isVisibleCat, setIsVisibleCat] = useState<boolean>(true);
  const [isVisiblePrice, setIsVisiblePrice] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const changeHandler = (value: number) => {
    const updatedCategories = selectedCat.includes(value)
      ? selectedCat.filter((id) => id !== value)
      : [...selectedCat, value];
    setSelectedCat(updatedCategories);
  };

  const visibleCatHandler = () => {
    setIsVisibleCat(!isVisibleCat);
  };
  const visiblePriceHandler = () => {
    setIsVisiblePrice(!isVisiblePrice);
  };

  useEffect(() => {
    const updateParams = () => {
      const params = new URLSearchParams(searchParams.toString());
      if (selectedCat.length > 0) {
        params.set("categoryId", selectedCat.join(" "));
      } else {
        params.delete("categoryId");
      }
      if (minPrice) params.set("minPrice", minPrice);
      else params.delete("minPrice");
      if (maxPrice) params.set("maxPrice", maxPrice);
      else params.delete("maxPrice", maxPrice);
      router.push(`/product?${params.toString()}`);
    };
    updateParams();
  }, [minPrice, maxPrice, selectedCat, searchParams, router]);

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-[20px] font-semibold text-neutral-50">Category</p>
        <div onClick={() => visibleCatHandler()}>
          <ChevronDownIcon />
        </div>
      </div>
      <div
        className={`flex flex-col py-[8px] gap-[20px] text-[16px] text-neutral-50 ${
          !isVisibleCat ? "hidden" : ""
        }`}
      >
        <label className="flex gap-[16px]">
          <input
            type="checkbox"
            checked={selectedCat.length === 0}
            onChange={() => setSelectedCat([])}
            className="w-[26px] h-[26px] accent-primary-500"
          />
          All
        </label>
        {data.map((c) => (
          <label key={c.id} className="flex gap-[16px]">
            <input
              type="checkbox"
              value={c.id}
              checked={selectedCat.includes(c.id)}
              onChange={() => changeHandler(c.id)}
              className="w-[26px] h-[26px] accent-primary-500"
            />
            {capFirstLet(c.name)}
          </label>
        ))}
      </div>
      <div className="flex justify-between items-center pb-[16px] pt-[52px] ">
        <p className="text-[20px] font-semibold text-neutral-50">Price</p>
        <div onClick={() => visiblePriceHandler()}>
          <ChevronDownIcon />
        </div>
      </div>
      <div
        className={`flex flex-col gap-[16px] ${
          !isVisiblePrice ? "hidden" : ""
        }`}
      >
        <CurrencyInput
          decimalsLimit={2}
          placeholder="$ Min Price"
          prefix="$"
          onValueChange={(value) => setMinPrice(value)}
          className="bg-neutral-900 border border-gray-400 rounded-md text-neutral-50 text-[16px] py-[14px] px-[18px] w-[150px]"
        />
        <CurrencyInput
          decimalsLimit={2}
          placeholder="$ Max Price"
          prefix="$"
          onValueChange={(value) => setMaxPrice(value)}
          className="bg-neutral-900 border border-gray-400 rounded-md text-neutral-50 text-[16px] py-[14px] px-[18px] w-[150px]"
        />
      </div>
    </>
  );
};

export default Filter;
