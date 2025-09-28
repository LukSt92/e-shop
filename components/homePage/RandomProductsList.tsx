"use client";
import { Product } from "@/app/lib/types";
import { useRef, useState, useEffect } from "react";
import Button from "../shared/Button";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { capFirstLet } from "@/utilis/capFirstLet";
import ProductCard from "../shared/ProductCard";

type RandomProductsListProps = {
  data: Product[];
  title: string;
};
const RandomProductsList = ({ data, title }: RandomProductsListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [showSeeAll, setShowSeeAll] = useState(true);

  const handleSeeMore = () => {
    if (listRef.current) {
      const gap = 24;
      const scrollAmount = 220 + gap;
      listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScroll = () => {
    if (!listRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    setShowSeeAll(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div className="pt-[80px]  pb-[100px] px-[40px]">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[28px] text-neutral-50">{capFirstLet(title)}</p>
        {showSeeAll && (
          <Button style="text" size="L" onClick={handleSeeMore}>
            See All
            <ArrowRightIcon color="#ee701d" />
          </Button>
        )}
      </div>

      <div
        ref={listRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
        onScroll={checkScroll}
      >
        {data.map((data) => (
          <div key={data.id} className="flex-shrink-0">
            <ProductCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomProductsList;
