import Image from "next/image";
import heroweb from "@/assets/images/hero.webp";

function Hero() {
  return (
    <div className="pt-4 overflow-hidden">
      <div className="relative w-screen h-[200px] sm:h-[240px] lg:h-[300px]">
        <Image
          src={heroweb}
          alt="hero image"
          fill
          className="object-fit"
          priority
        />
      </div>
      <h1 className="text-center py-6">
        <span className="text-primary font-bold text-lg md:text-2xl lg:text-3xl">
          رهیار
        </span>
        <span className="text-slate-600 dark:text-gray-100 font-medium text-base md:text-xl lg:text-2xl">
          {" "}
          همراه سفرهای فراموش‌نشدنی شما
        </span>
      </h1>
    </div>
  );
}

export default Hero;
