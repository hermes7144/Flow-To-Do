export function getDate() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;
  return formattedDate;
}
