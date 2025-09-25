import { capFirstLet } from "@/utilis/capFirstLet";
import React from "react";

type BadgeProps = {
  title: string;
};

const Badge = ({ title }: BadgeProps) => {
  return (
    <div className="px-[10px] py-[6px] rounded-md bg-blazeOrange-600 text-[14px] max-w-fit">
      <p className="text-[14px] text-primary-50">{capFirstLet(title)}</p>
    </div>
  );
};

export default Badge;
