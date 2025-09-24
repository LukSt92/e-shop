"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex text-[16px] gap-[48px] font-semibold text-neutral-500">
      <Link href="/" className={pathname === "/" ? "text-primary-500" : ""}>
        Home
      </Link>
      <Link
        href="/product"
        className={pathname === "/product" ? "text-primary-500" : ""}
      >
        Product
      </Link>
      <Link
        href="/contact"
        className={pathname === "/contact" ? "text-primary-500" : ""}
      >
        Contact
      </Link>
    </nav>
  );
};

export default NavBar;
