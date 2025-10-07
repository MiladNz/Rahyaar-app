import Image from "next/image";
import getFaDigit from "@/utils/getFaDigits";
import Link from "next/link";

function TourCard({ tour }) {
  const options = tour.options.slice(",").join("-");
  return (
    <div className="w-max mx-auto flex flex-col border-2 rounded-xl items-center">
      <div className="relative w-[320px] h-[159px] lg:w-[280px] ">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="rounded-t-lg object-cover "
          priority={false}
          loading="lazy"
        />
      </div>
      <div className="w-full flex flex-col gap-y-3 p-2">
        <p className="text-[22px] font-medium">{tour.title}</p>
        <p className="text-[15px] text-slate-500 w-60 truncate">{options}</p>
      </div>
      <div className="w-full flex justify-between p-2">
        <Link href={`/tours/${tour.id}`}>
          <button className="px-9 py-1 bg-[#28A745] text-white text-[15px] rounded-md">
            رزرو
          </button>
        </Link>
        <p className="text-base">
          <span className="text-[#009ECA]">
            {getFaDigit(tour.price.toLocaleString())}
          </span>{" "}
          <span className="text-slate-500">تومان</span>
        </p>
      </div>
    </div>
  );
}

export default TourCard;
