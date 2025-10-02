"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { loginSchema } from "@/lib/schema";
import { emailRegex, phoneRegex } from "@/lib/regex";
import InputForm from "../shared/InputForm";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    mode: "onSubmit",
  });

  const handleEmailSubmit = async (data: LoginFormData) => {
    if (!data.emailOrMobile) {
      setErrorMessage("Please enter your email or mobile.");
      return;
    }

    if (
      !emailRegex.test(data.emailOrMobile) &&
      !phoneRegex.test(data.emailOrMobile)
    ) {
      setErrorMessage("Email or Phone Number is not valid.");
      return;
    }

    setErrorMessage(null);
    setStep("password");
    reset({ emailOrMobile: data.emailOrMobile, password: "" });
  };

  const handlePasswordSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    if (!data.password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      const result = await signIn("credentials", {
        identifier: data.emailOrMobile,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("Email/Phone Number or Password Incorrect");
        setStep("email");
        reset();
        return;
      }

      if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      setErrorMessage("Network error. Please try again.");
      setStep("email");
      reset();
    }
  };

  return (
    <div className="w-[448px] h-full p-6 bg-neutral-900 border border-border rounded-md flex flex-col">
      <p className="text-[24px] font-medium text-neutral-50 border-b border-border pb-[20px] mb-[32px]">
        {step === "email" ? "Sign In" : "Enter Password"}
      </p>
      <form
        onSubmit={handleSubmit(
          step === "email" ? handleEmailSubmit : handlePasswordSubmit
        )}
        className="space-y-4 flex-1 flex flex-col"
      >
        {step === "email" && (
          <InputForm
            type={step === "email" ? "text" : "hidden"}
            label="Email or mobile phone number"
            placeholder="Email or Mobile phone Number"
            register={register("emailOrMobile")}
            error={errors.emailOrMobile}
          />
        )}

        {step === "password" && (
          <>
            <InputForm
              type="password"
              label="Password"
              placeholder="Password"
              register={register("password")}
              error={errors.password}
            />
          </>
        )}

        {errorMessage && (
          <span className="text-danger-400 text-[14px]">{errorMessage}</span>
        )}

        <button
          type="submit"
          className="w-full py-4 text-text-m font-medium bg-primary-400 text-neutral-900 rounded-md mt-4 cursor-pointer"
        >
          {step === "email" ? "Continue" : "Sign In"}
        </button>
      </form>

      <div className="mt-4 text-center flex">
        <p className=" text-neutral-100 text-[16px] font-medium flex">
          {"Don't have an account?"}
        </p>
        <p
          onClick={() => router.push("/register")}
          className="text-[16px] font-bold text-neutral-100 cursor-pointer pl-[4px]"
        >
          Register
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
