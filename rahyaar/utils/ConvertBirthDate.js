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

export function convertGregorianToJalali(isoDate) {
  if (!isoDate) return "";

  const date = new Date(isoDate);
  const { gy, gm, gd } = {
    gy: date.getFullYear(),
    gm: date.getMonth() + 1,
    gd: date.getDate(),
  };
  const { jy, jm, jd } = jalaali.toJalaali(gy, gm, gd);

  const pad = (n) => (n < 10 ? `0${n}` : n);
  return `${jy}/${pad(jm)}/${pad(jd)}`;
}
