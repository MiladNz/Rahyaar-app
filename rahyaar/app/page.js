import Hero from "@/components/sections/Hero";
import SearchSection from "@/components/search/SearchSection";
import CallBanner from "@/components/sections/CallBanner";

export default async function Home() {
  return (
    <>
      <Hero />
      <SearchSection />
      <CallBanner />
    </>
  );
}
