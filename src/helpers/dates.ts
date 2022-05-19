export function formatDate(date: Date): string {
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

  const _date = day + '-' + month + '-' + year + 'T' + time + 'z';
  return _date.toString();
}

export function formatDisplayDate(_date: Date, reverse: boolean): string {
  let _formattedDate = '';
  if (reverse) {
    _formattedDate =
      _date.getFullYear() +
      '-' +
      ('0' + (_date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + _date.getDate()).slice(-2);
  } else {
    _formattedDate =
      ('0' + _date.getDate()).slice(-2) +
      '-' +
      ('0' + (_date.getMonth() + 1)).slice(-2) +
      '-' +
      _date.getFullYear();
  }
  return _formattedDate;
}
