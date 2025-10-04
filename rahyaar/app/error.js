"use client";

import Image from "next/image";
import error_d from "@/assets/images/error_d.svg";
import error_m from "@/assets/images/error_m.svg";

export default function ErrorPage() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-5 pb-5 lg:hidden">
        <Image src={error_m} alt="error" width={322} height={322} />
        <h3 className="text-2xl font-semibold text-[#282828]">
          اتصال با سرور برقرار نیست!
        </h3>
        <p className="text-base font-semibold text-[#282828]">
          لطفا بعدا دوباره امتحان کنید.
        </p>
      </div>

      <div className="hidden lg:flex justify-between items-center gap-y-5 gap-x-10">
        <div className="flex flex-col gap-y-10 items-center">
          <h3 className="text-4xl font-semibold text-[#282828]">
            اتصال با سرور برقرار نیست!
          </h3>
          <p className="text-2xl font-semibold text-[#282828]">
            لطفا بعدا دوباره امتحان کنید.
          </p>
        </div>
        <Image src={error_d} alt="error" width={555} height={555} />
      </div>
    </div>
  );
}
