"use client";
import { Brand } from "@/app/lib/types";
import { useRef, useState, useEffect } from "react";
import DataCard from "../shared/DataCard";
import Button from "../shared/Button";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { capFirstLet } from "@/utilis/capFirstLet";
import Image from "next/image";

type ScrollableListProps = {
  data: Brand[];
  title: string;
};
const ScrollableList = ({ data, title }: ScrollableListProps) => {
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
            <DataCard name={data.name}>
              <Image
                src={data.logoUrl}
                alt={data.name}
                width={80}
                height={46}
                className="w-auto min-h-[64px] max-h-[64px] max-w-[120px]"
              />
            </DataCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableList;
