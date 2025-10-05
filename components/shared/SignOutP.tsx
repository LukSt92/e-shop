"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const SignOutP = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });

    router.push("/login");
    router.refresh();
  };
  return (
    <p
      onClick={handleSignOut}
      className="text-neutral-100 text-[16px] font-medium pt-[24px] cursor-pointer"
    >
      Logout
    </p>
  );
};

export default SignOutP;
