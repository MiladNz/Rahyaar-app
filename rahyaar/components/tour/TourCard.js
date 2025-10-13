import Image from "next/image";
import getFaDigits from "@/utils/getFaDigits";
import Link from "next/link";

function TourCard({ tour }) {
  const options = tour.options?.slice(",").join(" - ") || "";

  return (
    <div className="w-full max-w-[320px] mx-auto flex flex-col border rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          priority={false}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-y-2 p-3">
        <p className="text-[22px] font-medium">{tour.title}</p>
        <p className="text-[15px] text-slate-500 w-64 truncate">{options}</p>
      </div>

      <div className="flex justify-between items-center px-3 pb-3">
        <Link href={`/tours/${tour.id}`}>
          <button className="px-9 pb-3 pt-2 bg-primary text-white text-[15px] font-medium rounded-md hover:bg-primary/70 transition">
            رزرو
          </button>
        </Link>

        <p className="text-right">
          <span className="text-complementry font-semibold text-lg lg:text-xl">
            {getFaDigits(tour.price.toLocaleString())}
          </span>
          <span className="text-slate-500 text-base mr-1">تومان</span>
        </p>
      </div>
    </div>
  );
}

export default TourCard;
