import { getTourByIdAction } from "@/app/actions/getTourById";
import ReserveClientPage from "./ReserveClientPage";
import { notFound } from "next/navigation";

export default async function ReservePage({ params }) {
  const { id } = await params;
  const tour = await getTourByIdAction(id);

  if (!tour) {
    notFound();
  }
  return <ReserveClientPage tour={tour} />;
}
