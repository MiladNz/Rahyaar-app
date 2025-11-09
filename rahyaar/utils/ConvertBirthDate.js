import jalaali from "jalaali-js";

function toEnglishDigits(str) {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

export function convertBirthDateToGregorian(jalaliBirthDate) {
  if (!jalaliBirthDate) return null;

  const engDate = toEnglishDigits(jalaliBirthDate);

  const [jy, jm, jd] = engDate.split("/").map(Number);
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);

  return new Date(gy, gm - 1, gd).toISOString();
}
