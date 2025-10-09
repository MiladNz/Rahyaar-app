"use client";

import { useState } from "react";
import SearchForm from "./SearchForm";
import TourList from "../tour/TourList";
import { getToursAction } from "@/app/actions/getTours";

export default function SearchSection({ initialTours = [] }) {
  const [tours, setTours] = useState(initialTours);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    const result = await getToursAction(filters);
    setTours(result);
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <SearchForm searchHandler={handleSearch} />
      {loading ? (
        <p className="text-gray-500 mt-6 text-lg">در حال جستجو...</p>
      ) : (
        <TourList tours={tours} />
      )}
    </div>
  );
}
