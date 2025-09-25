"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../shared/Button";
import { capFirstLet } from "@/utilis/capFirstLet";
import { Category } from "@/app/lib/types";

type CarouselProps = {
  categories: Category[];
};

export default function MainCarousel({ categories }: CarouselProps) {
  const [currentId, setCurrentId] = useState(0);
  const current = categories[currentId];

  const handlePrev = () => {
    setCurrentId((prev) => (prev > 0 ? prev - 1 : categories.length - 1));
  };

  const handleNext = () => {
    setCurrentId((prev) => (prev < categories.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative py-8 mx-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-between bg-gray-50">
        <div className="flex flex-col flex-1 justify-center max-[700px]:p-0 pl-30 text-left sm:text-center">
          <h2 className="text-3xl font-semibold text-left text-white mb-4">
            {capFirstLet(current.name)}
          </h2>
          <p className="text-gray-400 pb-10 pt-2 text-left">
            {current.description}
          </p>
          <Button style="stroke" size="XL">
            Explore Category
          </Button>
        </div>
        <div className="h-80 relative justify-items-center overflow-hidden mx-[60px] md:mr-[120px]">
          <Image
            src={current.imageUrl}
            alt={current.name}
            width={460}
            height={320}
            priority
          />
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button onClick={handlePrev} style="fill" size="M">
          ◀
        </Button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center pl-[120px]">
        <Button onClick={handleNext} style="fill" size="M">
          ▶
        </Button>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {categories.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentId ? "bg-primary-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
