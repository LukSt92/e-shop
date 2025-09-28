"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/app/lib/schema";
import { z } from "zod";
import InputForm from "../shared/InputForm";

const RegisterForm = () => {
  const router = useRouter();
  const schema = registerSchema;
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error(result.message || "register error.");
      } else {
        document.cookie = "registered=true; path=/; max-age=5";
        router.push("/register/success");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("network error.");
      }
    }
  };

  return (
    <div className="w-[448px] h-full p-6 bg-neutral-900 border border-border rounded-md flex flex-col">
      <p className="text-[24px] font-medium text-neutral-50 border-b border-border pb-[20px] mb-[32px]">
        Create Account
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-[24px]"
      >
        <InputForm
          type="email"
          label="Email"
          placeholder="john@example.com"
          register={register("email")}
          error={errors.email}
        />
        <InputForm
          label="Mobile Number"
          placeholder="9 digit mobile number"
          register={register("phone")}
          error={errors.phone}
        />
        <InputForm
          type="password"
          label="Password"
          placeholder="Password"
          register={register("password")}
          error={errors.password}
        />
        <InputForm
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />
        <div>
          <label className="block text-[18px] text-neutral-50 font-medium mb-2">
            Country / Region
          </label>
          <select
            {...register("country")}
            className={`w-full h-[54px] border rounded-md p-2 text-base mb-8 bg-neutral-900 border-gray-400 text-gray-400`}
            defaultValue=""
          >
            <option value="" disabled>
              Select country
            </option>
            <option value="Netherlands">Netherlands</option>
            <option value="Poland">Poland</option>
            <option value="France">France</option>
          </select>
          {errors.country && (
            <span className="text-danger-400 text-[14px]">
              {errors.country.message}
            </span>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("acceptPolicy")}
            className="w-[26px] h-[26px] mr-[8px] flex-none accent-[#F29145] cursor-pointer"
          />
          <div className="text-[14px] text-neutral-100">
            By creating an account and checking, you agree to the{" "}
            <span className="text-primary-400 cursor-pointer">
              Conditions of Use
            </span>{" "}
            and{" "}
            <span className="text-primary-400 cursor-pointer">
              Privacy Notice
            </span>
            .
          </div>
        </div>
        {errors.acceptPolicy && (
          <span className="text-danger-400 text-[14px]">
            {errors.acceptPolicy.message}
          </span>
        )}
        <button
          type="submit"
          className="w-full py-4 text-[16px] font-medium bg-primary-400 text-base-black rounded-md mt-4 cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
