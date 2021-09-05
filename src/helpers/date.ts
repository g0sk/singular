export function dateWithoutTimezone(date: string) {
  const formattedDate = new Date(Date.parse(date));
  return (
    formattedDate.toLocaleDateString() +
    ' ' +
    formattedDate.toLocaleTimeString()
  );
}
