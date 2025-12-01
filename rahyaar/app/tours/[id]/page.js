import React from "react";
import { getTourByIdAction } from "@/app/actions/getTourById";
import TourClientWrapper from "./TourClientWrapper";
import BASE_URL from "@/services/api";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const res = await fetch(`${BASE_URL}/tour`, {
      next: { revalidate: 300 },
    });
    const tours = await res.json();

    return tours.map((tour) => ({
      id: String(tour.id),
    }));
  } catch (err) {
    console.error("خطا در generateStaticParams:", err);
    return [];
  }
}

export default async function TourPage({ params }) {
  const { id } = await params;

  const tourInfo = await getTourByIdAction(id);

  return <TourClientWrapper initialTour={tourInfo} tourId={id} />;
}
