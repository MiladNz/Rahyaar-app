"use client";

import getCityName from "@/utils/getCityName";
import ConvertDate from "@/utils/ConvertDate";
import { IoSearch } from "react-icons/io5";
import { LuFilterX } from "react-icons/lu";

export default function ClearFiltersBtn({ onClear, filters }) {
  const getActiveFilters = () => {
    const activeFilters = [];

    if (filters.originId) {
      const originName = getCityName(filters.originId);
      activeFilters.push(`مبدا: ${originName}`);
    }

    if (filters.destinationId) {
      const destinationName = getCityName(filters.destinationId);
      activeFilters.push(`مقصد: ${destinationName}`);
    }

    if (filters.startDate && filters.endDate) {
      const startDate = ConvertDate(filters.startDate);
      const endDate = ConvertDate(filters.endDate);
      activeFilters.push(`تاریخ: ${startDate} تا ${endDate}`);
    } else if (filters.startDate) {
      const startDate = ConvertDate(filters.startDate);
      activeFilters.push(`تاریخ: از ${startDate}`);
    }

    return activeFilters.join(" • ");
  };

  return (
    <div className="w-5/6 md:w-full max-w-7xl mt-6 mb-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-orange-50 border border-complementry rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="hidden md:block p-2 rounded-lg text-complementry">
              <IoSearch className="w-6 h-6" />
            </div>
            <div>
              <p className="text-textColor font-semibold">فیلترهای فعال</p>
              <p className="text-textColor text-sm md:text-base mt-1 ">
                {getActiveFilters()}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClear}
          className="flex items-center justify-center gap-2 text-white bg-complementry hover:text-complementry hover:bg-white transition-all cursor-pointer font-semibold p-2 md:px-4 md:py-3 rounded-lg shadow-sm w-full md:w-auto mt-3 md:mt-0">
          <span>
            <LuFilterX className="w-4 h-4" />
          </span>
          <span className="font-normal">حذف فیلترها </span>
        </button>
      </div>
    </div>
  );
}
