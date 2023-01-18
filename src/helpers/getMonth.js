export function getMonth(date) {
  const month = date.getMonth();
  if (month == 0) return 'ЯНВАРЬ';
  if (month == 1) return 'ФЕВРАЛЬ';
  if (month == 2) return 'МАРТ';
  if (month == 3) return 'АПРЕЛЬ';
  if (month == 4) return 'МАЙ';
  if (month == 5) return 'ИЮНЬ';
  if (month == 6) return 'ИЮЛЬ';
  if (month == 7) return 'АВГУСТ';
  if (month == 8) return 'СЕНТЯБРЬ';
  if (month == 9) return 'ОКТЯБРЬ';
  if (month == 10) return 'НОЯБРЬ';
  if (month == 11) return 'ДЕКАБРЬ';
}