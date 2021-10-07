export function formatDate(date: Date) {
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const time =
    date.getHours() +
    '-' +
    date.getMinutes() +
    '-' +
    date.getSeconds() +
    '.' +
    date.getMilliseconds();

  const _date = day + '-' + month + '-' + year + 'T' + time;
  return _date;
}
