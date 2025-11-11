import jalaali from "jalaali-js";

function toEnglishDigits(str) {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

export function convertBirthDateToGregorian(jalaliBirthDate) {
  if (!jalaliBirthDate) return null;

  const cleanDate = toEnglishDigits(jalaliBirthDate.trim());
  const [jy, jm, jd] = cleanDate.split("/").map(Number);

  if (isNaN(jy) || isNaN(jm) || isNaN(jd)) {
    console.log("Invalid Jalali date format:", jalaliBirthDate);
    return null;
  }

  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);

  if (gy < 1000 || gy > 3000) {
    console.log("Invalid converted Gregorian year:", gy, { jy, jm, jd });
    return null;
  }

  return `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
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
