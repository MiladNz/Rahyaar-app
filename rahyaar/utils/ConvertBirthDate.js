import { toGregorian } from "jalaali-js";

export const convertBirthDateToGregorian = (jalaliBirthDate) => {
  if (!jalaliBirthDate) return "";
  const [year, month, day] = jalaliBirthDate.split("/").map(Number);
  const gregorian = toGregorian(year, month, day);
  const birthDateToGre = `${gregorian.gy}-${String(gregorian.gm).padStart(
    2,
    "0"
  )}-${String(gregorian.gd).padStart(2, "0")}`;
  return birthDateToGre;
};
