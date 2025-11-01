import Image from "next/image";
import { IoCall } from "react-icons/io5";
import callBanner from "@/assets/images/call.png";

function CallBanner() {
  return (
    <section className="flex flex-col lg:flex-row lg:justify-between max-w-[310px] sm:max-w-[525px] md:max-w-[750px] lg:max-w-screen-lg relative w-full mx-auto my-24 border-2 rounded-lg shadow-sm border-primary ">
      <div className="flex items-center border-b-2 lg:border-b-0 lg:border-l-2 rounded-t-lg bg-white py-8 lg:w-3/4">
        <div className="text-right px-2 lg:px-6 pb-1 ">
          <p className="text-xl md:text-3xl lg:text-4xl mb-3">
            <span className="font-semibold text-textColor">خرید تلفنی از</span>{" "}
            <span className="font-bold text-primary">رهیار</span>
          </p>
          <p className="text-textColor text-sm md:text-lg font-medium lg:text-left lg:text-2xl">
            به هر کجا که میخواهید!
          </p>
        </div>
        <Image
          src={callBanner}
          alt="call banner"
          width={190}
          height={158}
          priority={false}
          loading="lazy"
          className="absolute -left-1 scale-95 bottom-[70px] lg:scale-110 lg:left-80 lg:bottom-2"
        />
      </div>
      <div className="flex lg:flex-col justify-around items-center p-4 lg:w-1/4">
        <div className="flex items-center gap-x-2">
          <p className="text-xl font-bold">۰۲۱-۱۸۴۰</p>
          <IoCall className="w-5 h-5 lg:w-6 lg:h-6" />
        </div>
        <button className="bg-primary text-white px-7 py-2 rounded-lg">
          اطلاعات بیشتر
        </button>
      </div>
    </section>
  );
}

export default CallBanner;
