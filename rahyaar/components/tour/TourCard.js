import Image from "next/image";
import getFaDigits from "@/utils/getFaDigits";
import Link from "next/link";

function TourCard({ tour }) {
  const options = tour.options?.slice(",").join(" - ") || "";

  return (
    <div className="w-full max-w-[320px] mx-auto flex flex-col border rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md dark:shadow-white/30 border-gray-200 dark:border-gray-700">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          priority={false}
          loading="lazy"
          unoptimized
        />
      </div>

      <div className="flex flex-col gap-y-2 p-3 border-b border-gray-200 dark:border-gray-700">
        <p className="text-[22px] font-medium text-gray-800 dark:text-white">
          {tour.title}
        </p>
        <p className="text-[15px] text-slate-500 dark:text-gray-400 w-64 truncate">
          {options}
        </p>
      </div>

      <div className="flex justify-between items-center p-3">
        <p className="text-right">
          <span className="text-complementry font-bold text-lg lg:text-xl">
            {getFaDigits(tour.price.toLocaleString())}
          </span>
          <span className="text-slate-400 dark:text-gray-500 text-base mr-1">
            تومان
          </span>
        </p>
        <Link href={`/tours/${tour.id}`}>
          <button className="px-9 pb-3 pt-2 shadow-lg shadow-primary/40 dark:shadow-white/20 bg-primary dark:bg-secondary text-white text-[15px] font-medium rounded-md hover:bg-primary/70 dark:hover:bg-secondary/80 dark:hover:shadow-white/50 transition">
            رزرو
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TourCard;
