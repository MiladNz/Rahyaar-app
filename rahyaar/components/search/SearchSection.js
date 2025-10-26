"use client";

import { useEffect, useState, useMemo } from "react";
import SearchForm from "./SearchForm";
import TourList from "../tour/TourList";
import { useTours } from "@/app/hooks/useTours";

export default function SearchSection() {
  const [filters, setFilters] = useState({});
  const { data: filteredTours = [], isLoading, error } = useTours(filters);
  const { data: allTours = [] } = useTours({});

  const { origins, destinations } = useMemo(() => {
    if (!allTours || allTours.length === 0) {
      return { origins: [], destinations: [] };
    }

    const uniqueOrigins = Array.from(
      new Map(allTours.map((t) => [t.origin.id, t.origin])).values()
    );
    const uniqueDestinations = Array.from(
      new Map(allTours.map((t) => [t.destination.id, t.destination])).values()
    );

    return { origins: uniqueOrigins, destinations: uniqueDestinations };
  }, [allTours]);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  const hasFilters = Object.keys(filters).some((key) => {
    const value = filters[key];
    return value !== undefined && value !== null && value !== "";
  });

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-8">
      <SearchForm
        origins={origins}
        destinations={destinations}
        searchHandler={handleSearch}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-gray-500">در حال جستجو...</p>
        </div>
      ) : error ? (
        <div className="mt-6 text-center">
          <p className="text-red-500">خطا در دریافت تورها</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-primary hover:text-secondary transition-colors">
            تلاش مجدد
          </button>
        </div>
      ) : (
        <TourList
          tours={filteredTours}
          filters={filters}
          hasFilters={hasFilters}
        />
      )}
    </div>
  );
}
