export default function getFaCityName(name) {
  const cityList = {
    Tehran: "تهران",
    Sanandaj: "سنندج",
    Sananndaj: "سنندج",
    Madrid: "مادرید",
    Isfahan: "اصفهان",
    sulaymaniyahTour: "سلیمانیه",
    Hewler: "هولیر",
    Mazandaran: "مازندران",
    "offRoad Center": "آفرود",
    Italy: "ایتالیا",
  };
  return cityList[name];
}
