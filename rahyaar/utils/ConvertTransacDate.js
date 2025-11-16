import jalaali from "jalaali-js";
import getFaDigits from "./getFaDigits";

function ConvertTransacData(inputDateTime) {
  const date = new Date(inputDateTime);

  const tehranDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Tehran" })
  );

  const { jy, jm, jd } = jalaali.toJalaali(tehranDate);
  const hours = tehranDate.getHours();
  const minutes = tehranDate.getMinutes();

  const formatted =
    `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} - ` +
    `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}  `;

  return getFaDigits(formatted);
}
export default ConvertTransacData;
