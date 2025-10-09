import Hero from "@/components/sections/Hero";
import { getToursAction } from "./actions/getTours";
import SearchSection from "@/components/search/SearchSection";

export default async function Home() {
  const initialTours = await getToursAction();
  return (
    <>
      <Hero />
      <SearchSection initialTours={initialTours} />
    </>
  );
}
