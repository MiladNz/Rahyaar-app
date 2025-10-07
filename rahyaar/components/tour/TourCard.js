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
          <button className="px-9 pb-3 pt-2 bg-primary text-white text-[15px] font-medium rounded-md">
            رزرو
          </button>
        </Link>
        <p>
          <span className="text-complementry font-semibold text-lg lg:text-xl">
            {getFaDigit(tour.price.toLocaleString())}
          </span>{" "}
          <span className="text-slate-500 text-base">تومان</span>
        </p>
      </div>
    </div>
  );
}

export default TourCard;
