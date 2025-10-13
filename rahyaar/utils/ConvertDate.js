import jalaali from "jalaali-js";
import getFaDigits from "./getFaDigits";

function ConvertDate(date) {
  const utcDate = new Date(date);
  const tehranDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "Asia/Tehran" })
  );

  const { jy, jm, jd } = jalaali.toJalaali(tehranDate);

  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  const converted = `${jd} ${persianMonths[jm - 1]} ${jy}`;
  return getFaDigits(converted);
}

export default ConvertDate;
