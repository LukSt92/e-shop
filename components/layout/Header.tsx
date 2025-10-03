"use client";
import React from "react";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import NavBar from "../shared/NavBar";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "../icons/CartIcon";
import { useEffect } from "react";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div className="px-[40px] py-[32px]">
      <div className="flex justify-between items-center pb-[40px]">
        <Logo />
        <div>
          {session ? (
            <div className="flex gap-x-[28px] items-center">
              <Link href={"/cart"}>
                <CartIcon color="#FCFCFC" />
              </Link>
              <Image
                src={"/LionAvatar.svg"}
                alt="Avatar"
                height={40}
                width={40}
              />
              <Button style="stroke" size="L" onClick={() => signOut()}>
                <p className="text-[16px] text-primary-500 font-medium px-[20px]">
                  Sign out
                </p>
              </Button>
            </div>
          ) : (
            <Link href={"/login"}>
              <Button style="fill" size="L">
                <p className="text-[16px] text-neutral-900 font-medium px-[20px]">
                  Sign in
                </p>
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="pb-[40px] border-b border-gray-600">
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
