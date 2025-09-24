import React from "react";
import Logo from "../shared/Logo";
import VisaIcon from "../icons/VisaIcon";
import MasterCardIcon from "../icons/MasterCardIcon";
import PaypalIcon from "../icons/PayPalIcon";
import ApplePayIcon from "../icons/ApplePayIcon";
import GooglePayIcon from "../icons/GooglePayIcon";

const Footer = () => {
  return (
    <div className="bg-footer px-[40px] py-[32px] mt-auto">
      <div className="flex flex-col">
        <Logo />
        <p className="py-[24px] text-neutral-300 text-wrap w-[216px] ">
          © 2023 NexusHub. All rights reserved.
        </p>
        <div className="flex">
          <VisaIcon />
          <MasterCardIcon />
          <PaypalIcon />
          <ApplePayIcon />
          <GooglePayIcon />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
