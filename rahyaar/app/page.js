import Hero from "@/components/sections/Hero";
import TourList from "@/components/tour/TourList";
import { getToursAction } from "./actions/getTours";

export default async function Home() {
  const tours = await getToursAction();
  return (
    <>
      <Hero />
      <TourList tours={tours} />
    </>
  );
}
