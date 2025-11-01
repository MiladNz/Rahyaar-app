import Hero from "@/components/sections/Hero";
import SearchSection from "@/components/search/SearchSection";
import CallBanner from "@/components/sections/CallBanner";
import WhyUs from "@/components/sections/WhyUs";

export default async function Home() {
  return (
    <>
      <Hero />
      <SearchSection />
      <CallBanner />
      <WhyUs />
    </>
  );
}
