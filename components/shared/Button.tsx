import React from "react";

const btnSize: Record<string, string> = {
  XXL: "h-[60px] px-[16px] text-[18px]",
  XL: "h-[54px] px-[14px] text-[16px]",
  L: "h-[50px] px-[12px] text-[16px]",
  M: "h-[44px] px-[10px] text-[14px]",
  S: "h-[40px] px-[8px] text-[14px]",
  XS: "h-[34px] px-[6px] text-[12px]",
};

const btnStyle: Record<string, string> = {
  fill: "bg-primary-400 text-base-white hover:bg-primary-600 active:bg-primary-600 disabled:bg-primary-300",
  text: "text-primary-500 hover:text-primary-600 active:text-primary-400 disabled:text-primary-300",
  stroke:
    "text-primary-500 border border-primary-500 hover:border-primary-400 active:border-primary-400 active:text-primary-400 disabled:border-primary-300 disabled:text-primary-300",
};

const baseStyle =
  "flex flex-row gap-[14px] py-[20px] justify-center items-center shrink-0 cursor-pointer rounded-md ";

interface BtnProps {
  children: React.ReactNode | string;
  style: string;
  size: string;
  disabled?: boolean;
  fit?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  style,
  size,
  onClick,
  disabled,
  fit = true,
}: BtnProps) => {
  return (
    <button
      className={`${baseStyle} ${btnSize[size]} ${btnStyle[style]} ${
        fit ? "max-w-fit" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex gap-2 items-center"> {children}</div>
    </button>
  );
};

export default Button;
