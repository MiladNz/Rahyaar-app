const cityMap = new Map([
  ["1", "تهران"],
  ["2", "سنندج"],
  ["3", "مادرید"],
  ["4", "اصفهان"],
  ["5", "سلیمانیه"],
  ["6", "هولیر"],
  ["7", "مازندران"],
  ["8", "آفرود"],
  ["9", "ایتالیا"],
]);

export function getCityName(id) {
  return cityMap.get(id) || id;
}

export default getCityName;
