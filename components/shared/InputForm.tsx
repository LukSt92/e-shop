import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFormProps = {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
};

const InputForm = ({
  label,
  type = "text",
  placeholder,
  register,
  error,
}: InputFormProps) => {
  return (
    <div>
      <label className="block text-[18px] text-neutral-50 font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full border rounded-md py-[14px] px-[20px] text-[16px] placeholder-neutral-300 ${
          error ? "border-danger-600" : "border-gray-400"
        }`}
      />
      {error && (
        <span className="text-danger-400 text-[14px]">{error.message}</span>
      )}
    </div>
  );
};

export default InputForm;
