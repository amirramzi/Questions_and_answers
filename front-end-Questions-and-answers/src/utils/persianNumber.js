export function toPersianNumber(number) {
  const persianNumber = "٠١٢٣٤٥٦٧٨٩";
  return number
    .toString()
    .split("")
    .map((digit) => persianNumber[digit] || digit)
    .join("");
}
