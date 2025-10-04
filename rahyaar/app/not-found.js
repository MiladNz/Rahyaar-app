import Image from "next/image";
import Link from "next/link";
import notfound_d from "@/assets/images/notfound_d.svg";
import notfound_m from "@/assets/images/notfound_m.svg";

function notFound() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-y-5 lg:hidden">
        <Image
          src={notfound_m}
          alt="not found"
          width={322}
          height={322}
          priority={false}
          loading="lazy"
        />
        <h3 className="text-2xl font-semibold text-[#282828] mb-4">
          صفحه مورد نظر یافت نشد!
        </h3>
        <Link href="/">
          <button className="bg-sky-100 text-primary text-xl font-semibold py-3 px-5  rounded-2xl cursor-pointer hover:bg-orange-100 hover:text-secondary">
            بازگشت به صفحه اصلی
          </button>
        </Link>
      </div>
      <div className="hidden lg:flex justify-between items-center gap-y-5 gap-x-10">
        <div className="flex flex-col gap-y-20 items-center">
          <h3 className="text-4xl font-semibold text-[#282828]">
            صفحه مورد نظر یافت نشد!
          </h3>
          <Link href="/">
            <button className="bg-sky-100 text-primary text-2xl font-semibold py-4 px-11 rounded-2xl cursor-pointer hover:bg-orange-100 hover:text-secondary">
              بازگشت به صفحه اصلی
            </button>
          </Link>
        </div>
        <Image
          src={notfound_d}
          alt="not found"
          width={555}
          height={555}
          priority={false}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default notFound;
