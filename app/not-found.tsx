"use client";
import Loader from "@/components/shared/Loader";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col px-[40px] items-center">
      <p className="text-[24px] text-neutral-50 font-semibold">
        This page is under construction
      </p>
      <Loader />
    </div>
  );
}
