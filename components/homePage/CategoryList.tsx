import React from "react";
import { JSX } from "react";
import { Category } from "@/app/lib/types";
import MonitorIcon from "../icons/MonitorIcon";
import KeyboardIcon from "../icons/KeyboardIcon";
import MouseIcon from "../icons/MouseIcon";
import WebcamIcon from "../icons/WebcamIcon";
import HeadphoneIcon from "../icons/HeadphoneIcon";
import DataCard from "../shared/DataCard";

type CategoryListProps = {
  categories: Category[];
};

const categoryIcons: Record<string, JSX.Element> = {
  mice: <MouseIcon />,
  keyboards: <KeyboardIcon />,
  monitors: <MonitorIcon />,
  headphones: <HeadphoneIcon />,
  webcams: <WebcamIcon />,
};

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="px-[40px]">
      <p className="text-[28px] text-neutral-50 pb-[32px]">Category</p>
      <div className="flex flex-wrap justify-between gap-8 ">
        {/* {TODO dodać Link by przechodzić na stronę z produktami} */}
        {categories.map((cat) => (
          <DataCard key={cat.id} name={cat.name}>
            {categoryIcons[cat.name]}
          </DataCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
