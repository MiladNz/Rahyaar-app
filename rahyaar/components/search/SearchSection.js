"use client";

import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import TourList from "../tour/TourList";
import { getToursAction } from "@/app/actions/getTours";

export default function SearchSection({ initialTours = [] }) {
  const [tours, setTours] = useState(initialTours);
  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function fetchTours() {
      const allTours = await getToursAction();

      const uniqueOrigins = Array.from(
        new Map(allTours.map((t) => [t.origin.id, t.origin])).values()
      );
      const uniqueDestinations = Array.from(
        new Map(allTours.map((t) => [t.destination.id, t.destination])).values()
      );

      setOrigins(uniqueOrigins);
      setDestinations(uniqueDestinations);
      setTours(allTours);
    }
    fetchTours();
  }, []);

  const handleSearch = async (filters) => {
    setLoading(true);
    const result = await getToursAction(filters);
    setTours(result);
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <SearchForm
        origins={origins}
        destinations={destinations}
        searchHandler={handleSearch}
      />
      {loading ? (
        <p className="text-gray-500 mt-6 text-lg">در حال جستجو...</p>
      ) : (
        <TourList tours={tours} />
      )}
    </div>
  );
}
