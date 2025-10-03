"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutP = () => {
  return (
    <p
      onClick={() => signOut()}
      className="text-neutral-100 text-[16px] font-medium pt-[24px] cursor-pointer"
    >
      Logout
    </p>
  );
};

export default SignOutP;
