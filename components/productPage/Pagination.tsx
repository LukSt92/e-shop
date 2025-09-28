import Link from "next/link";
import React from "react";
import Button from "../shared/Button";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

type PaginationProps = {
  page: number;
  totalPages: number;
  url: string;
};

const Pagination = ({ page, totalPages, url }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between max-[1030px]:flex-col pb-[40px]">
      <div className="flex justify-start px-[40px] gap-[8px] flex-wrap">
        {pages.map((p) => (
          <Link key={p} href={`${url}&page=${p}`}>
            <div
              className={`rounded-md flex items-center justify-center text-[16px] cursor-pointer w-[44px] h-[44px] ${
                p === page
                  ? "bg-primary-500 text-neutral-900"
                  : "text-neutral-500"
              }`}
            >
              {p}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-x-[32px]">
        <Link href={`${url}&page=${page > 1 ? page - 1 : 1}`}>
          <Button style="stroke" size="XL">
            <ArrowLeftIcon color="#EE701D" />
            Previous
          </Button>
        </Link>
        <Link href={`${url}&page=${page < totalPages ? page + 1 : totalPages}`}>
          <Button style="stroke" size="XL">
            Next
            <ArrowRightIcon color="#EE701D" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
