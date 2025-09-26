"use client";
import Link from "next/link";
import React from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  url: string;
};

const Pagination = ({ page, totalPages, url }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-start mt-6 gap-2">
      {pages.map((p) => (
        <Link
          key={p}
          href={`${url}&page=${p}`}
          className={`px-3 py-1 rounded transition-colors cursor-pointer ${
            p === page ? "bg-orange-500 text-white" : "text-[#B0B0B0]"
          }`}
        >
          {p}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
