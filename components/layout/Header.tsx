"use client";
import React from "react";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import NavBar from "../shared/NavBar";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  console.log(status);

  return (
    <div className="px-[40px] py-[32px]">
      <div className="flex justify-between items-center pb-[40px]">
        <Logo />
        {/*TODO dodać ifa jeżeli użytkownik jest zalogowany zamienić btn na koszyk i awatar!*/}
        <div>{session ? <p>zalogowany</p> : <p>niedziala</p>}</div>
        <Button style="fill" size="L">
          Sign in
        </Button>
      </div>
      <div className="pb-[40px] border-b border-gray-600">
        <NavBar />
      </div>
    </div>
  );
};

export default Header;
