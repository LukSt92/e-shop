"use client";
import Image from "next/image";
import React, { useState } from "react";

type GalleryProps = {
  imageUrls: string[];
  name: string;
};

const Gallery = ({ imageUrls, name }: GalleryProps) => {
  const [mainImg, setMainImg] = useState<string>(imageUrls[0]);
  return (
    <div className="flex flex-col gap-y-[32px]">
      <div className="relative ps-[12px] w-[422px] h-[341px] border rounded-md border-border">
        <Image
          src={mainImg}
          alt={name}
          fill
          className="object-cover border rounded-md"
        />
      </div>
      <div className="flex gap-x-[16px]">
        {imageUrls.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={name}
            width={130}
            height={100}
            className="object-cover border rounded-md"
            onClick={() => setMainImg(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
