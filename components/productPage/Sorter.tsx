"use client";
import { capFirstLet } from "@/utilis/capFirstLet";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sorter = () => {
  const [sorting, setSorting] = useState<string>("latest");
  const [showing, setShowing] = useState<string>("3");
  const showAtOnce = [3, 6, 9, 12];
  const sortOptions = [
    { val: "latest", text: "newly listed" },
    { val: "asc", text: "price highest" },
    { val: "desc", text: "price lowest" },
  ];
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateParams = () => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sortBy", sorting);
      params.set("show", showing);
      router.push(`/product?${params.toString()}`);
    };
    updateParams();
  }, [router, searchParams, sorting, showing]);

  return (
    <div className="flex gap-[60px] pl-[40px]">
      <div className="flex items-center">
        <p className="text-[20px] font-semibold text-neutral-50 pr-[16px]">
          Sort by
        </p>
        <select
          onChange={(e) => setSorting(e.target.value)}
          className="border rounded-md border-gray-400 bg-neutral-900 px-[16px] py-[10px] text-[14px] text-neutral-50"
        >
          {sortOptions.map((opt, index) => (
            <option key={index} value={opt.val}>
              {capFirstLet(opt.text)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <p className="text-[20px] font-semibold text-neutral-50 pr-[16px]">
          Show
        </p>
        <select
          onChange={(e) => setShowing(e.target.value)}
          className="border rounded-md border-gray-400 bg-neutral-900 px-[16px] py-[10px] text-[14px] text-neutral-50"
        >
          {showAtOnce.map((val, index) => (
            <option key={index} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sorter;
