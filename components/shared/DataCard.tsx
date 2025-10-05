import { capFirstLet } from "@/utilis/capFirstLet";
import React from "react";

type DataCardProps = {
  children: React.ReactNode;
  name: string;
};

const DataCard = ({ children, name }: DataCardProps) => {
  return (
    <div className="flex flex-col flex-wrap justify-center items-center w-[220px] h-[190px] border border-gray-400 rounded-md p-[12px] gap-[24px]">
      {children}
      <p className="text-[20px] text-neutral-50">{capFirstLet(name)}</p>
    </div>
  );
};

export default DataCard;
