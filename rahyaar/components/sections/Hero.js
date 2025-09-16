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
      <h1 className="font-semibold text-base md:text-2xl lg:text-3xl text-center py-6">
        <span className="text-primary">رهیار</span>
        <span className="text-textColor"> همراه سفرهای فراموش‌نشدنی شما</span>
      </h1>
    </div>
  );
}

export default Hero;
