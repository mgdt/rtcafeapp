export function formatDateResult(timestamp) {
  const date = new Date(timestamp * 1000);
  let month = date.getMonth() + 1;
  let monthText = "";
  if (month == 1) {
    monthText = "января";
  }
  if (month == 2) {
    monthText = "февраля";
  }
  if (month == 3) {
    monthText = "марта";
  }
  if (month == 4) {
    monthText = "апреля";
  }
  if (month == 5) {
    monthText = "мая";
  }
  if (month == 6) {
    monthText = "июня";
  }
  if (month == 7) {
    monthText = "июля";
  }
  if (month == 8) {
    monthText = "августа";
  }
  if (month == 9) {
    monthText = "сентября";
  }
  if (month == 10) {
    monthText = "октября";
  }
  if (month == 11) {
    monthText = "ноября";
  }
  if (month == 12) {
    monthText = "декабря";
  }
  let day = date.getDate();
  return `${day} ${monthText}`;
}
