import SuccessIcon from "@/components/icons/SuccessIcon";

export default async function SuccessPage() {
  return (
    <div className="flex flex-col py-[77px] px-[40px] justify-center items-center text-center">
      <SuccessIcon />
      <p className="text-[44px] text-neutral-50 font-bold pt-[40px] pb-[16px]">
        Thank you!
      </p>
      <p className="text-[24px] text-neutral-50 font-medium pb-[32px]">
        You have succesfully register
      </p>
      <p className="text-[18px] text-neutral-100 pb-[19px]">
        Please check your e-mail for further information. Let`s exploring our
        products and enjoy many gifts.
      </p>
      <div className="flex">
        <p className="text-[18px] text-neutral-100">Having problem?</p>
        <p className="pl-[4px] text-[18px] text-primary-300">Contact us</p>
      </div>
    </div>
  );
}
