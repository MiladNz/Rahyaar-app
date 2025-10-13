import React from "react";
import { getTourByIdAction } from "@/app/actions/getTourById";
import TourDetails from "@/components/tour/TourDetails";

export default async function TourPage({ params }) {
  const { id } = await params;
  const tourInfo = await getTourByIdAction(id);

  return <TourDetails tour={tourInfo} />;
}
