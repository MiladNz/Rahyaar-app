"use client";

import React from "react";
import TourDetails from "@/components/tour/TourDetails";
import { useTourById } from "@/app/hooks/useTours";

export default function TourClientWrapper({ initialTour, tourId }) {
  const {
    data: tour,
    isLoading,
    error,
    refetch,
  } = useTourById(tourId, {
    initialData: initialTour,
  });

  if (isLoading && !tour) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !tour) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        <p className="text-red-500 text-lg">خطا در دریافت اطلاعات تور</p>
        <button
          onClick={() => refetch()}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          تلاش مجدد
        </button>
      </div>
    );
  }

  return <TourDetails tour={tour} />;
}
