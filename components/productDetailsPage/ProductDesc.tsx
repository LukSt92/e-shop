import React from "react";
import Badge from "../shared/Badge";
import ShieldIcon from "../icons/ShieldIcon";

type ProductDescProps = {
  name: string;
  category: string;
  desc: string;
  price: number;
  deliveryDay: string;
};

export const ProductDesc = ({
  name,
  category,
  desc,
  price,
  deliveryDay,
}: ProductDescProps) => {
  return (
    <div className="relative flex flex-col gap-y-[32px]">
      <div>
        <p className="text-[28px] text-neutral-50">{name}</p>
        <Badge title={category} />
      </div>
      <p className="text-[32px] text-neutral-50">{price}</p>
      <p className="text-[16px] text-neutral-50 text-wrap">{desc}</p>
      <div className="flex flex-col gap-y-[16px] self-start absolute bottom-0 ">
        <p className="text-[18px] text-neutral-300">Shipping Available</p>
        <div className="flex w-[312px] border rounded-md border-neutral-50 max-w-fit p-[16px]">
          <div className="pr-[8px]">
            <ShieldIcon />
          </div>
          <div>
            <p className="text-[16px] text-neutral-50 font-medium">
              NexusHub Courier
            </p>
            <p className="text-[16px] text-neutral-100">
              Estimated arrival {deliveryDay}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
