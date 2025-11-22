import Image from "next/image";
import Slider from "@/components/ui/Slider";
import { BsPatchQuestionFill } from "react-icons/bs";
import g16 from "@/assets/images/g16.svg";
import g17 from "@/assets/images/g17.svg";
import g18 from "@/assets/images/g18.svg";

function WhyUs() {
  return (
    <section className="container w-full mx-auto p-4 lg:max-w-screen-lg">
      <div className="flex items-center gap-x-2 my-4">
        <BsPatchQuestionFill className="w-9 h-9 text-secondary dark:text-complementry" />
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
          <span>چرا</span> <span className="text-primary">رهیار</span>
          <span>؟</span>
        </h3>
      </div>
      <div className="lg:flex w-full p-4">
        <div className="flex flex-col lg:w-[500px] lg:gap-4 mb-6">
          <h4 className="text-lg lg:text-2xl font-semibold text-gray-800 dark:text-white">
            تور طبیعت گردی و تاریخی
          </h4>
          <p className="text-base lg:text-xl font-normal text-justify leading-10 text-gray-700 dark:text-gray-300">
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل
            طبیعت چادر بزنید یا در یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای
            طبیعت‌گردی را خریداری کنید. اما اگر بخواهید از جاذبه‌های گردشگری و
            آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </div>
        <Slider />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 mx-auto text-textColor dark:text-gray-300 border-t-2 border-gray-200 dark:border-gray-700">
        <div className="flex gap-x-4 items-center">
          <Image
            src={g16}
            alt="icon"
            width={71}
            height={64}
            priority={false}
            loading="lazy"
          />
          <div className="flex flex-col gap-y-2">
            <h4 className="text-sm font-semibold md:text-base text-gray-800 dark:text-white">
              بصرفه ترین قیمت
            </h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.
            </p>
          </div>
        </div>
        <div className="flex gap-x-4 items-center">
          <Image
            src={g17}
            alt="icon"
            width={70}
            height={64}
            priority={false}
            loading="lazy"
          />
          <div className="flex flex-col gap-y-2">
            <h4 className="text-sm font-semibold md:text-base text-gray-800 dark:text-white">
              پشتیبانی
            </h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.
            </p>
          </div>
        </div>
        <div className="flex gap-x-4 items-center">
          <Image
            src={g18}
            alt="icon"
            width={64}
            height={64}
            priority={false}
            loading="lazy"
          />
          <div className="flex flex-col gap-y-2">
            <h4 className="text-sm font-semibold md:text-base text-gray-800 dark:text-white">
              رضایت کاربران
            </h4>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              رضایت بیش از 10هزار کاربر از تور های ما.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
