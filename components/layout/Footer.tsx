import React from "react";
import Logo from "../shared/Logo";
import VisaIcon from "../icons/VisaIcon";
import MasterCardIcon from "../icons/MasterCardIcon";
import PaypalIcon from "../icons/PayPalIcon";
import ApplePayIcon from "../icons/ApplePayIcon";
import GooglePayIcon from "../icons/GooglePayIcon";

const Footer = () => {
  const company = ["About Us", "Contact", "Partner"];
  const social = ["Insgram", "Twitter", "Facebook", "LinkedIn"];
  const faq = ["Account", "Deliveries", "Orders", "Payments"];
  const resources = ["E-books", "Tutorials", "Course", "Blog"];

  return (
    <div className="bg-footer px-[40px] py-[140px] mt-auto flex justify-between max-[925px]:flex-col ">
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
      <div className="flex gap-x-16 max-[600px]:flex-col max-[600px]:text-center">
        <ul>
          <li className="text-[20px] text-neutral-50 font-semibold">Company</li>
          {company.map((item, index) => (
            <li className="my-[16px]" key={index}>
              {item}
            </li>
          ))}
        </ul>
        <ul>
          <li className="text-[20px] text-neutral-50 font-semibold">Social</li>
          {social.map((item, index) => (
            <li className="my-[16px]" key={index}>
              {item}
            </li>
          ))}
        </ul>
        <ul>
          <li className="text-[20px] text-neutral-50 font-semibold">FAQ</li>
          {faq.map((item, index) => (
            <li className="my-[16px]" key={index}>
              {item}
            </li>
          ))}
        </ul>
        <ul>
          <li className="text-[20px] text-neutral-50 font-semibold">
            Resources
          </li>
          {resources.map((item, index) => (
            <li className="my-[16px]" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
