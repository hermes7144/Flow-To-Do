export function getToday() {
  return formatDate(new Date());
}

export function getTomorrow() {
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  return formatDate(tomorrowDate);
}

export function getThisWeek() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - dayOfWeek);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 7);

  return formatDate(endDate);
}
export function getNextWeek() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const nextWeekStart = new Date(currentDate);
  nextWeekStart.setDate(currentDate.getDate() + (8 - dayOfWeek));
  const nextWeekEnd = new Date(nextWeekStart);
  nextWeekEnd.setDate(nextWeekStart.getDate() + 6);

  const formattedStartDate = formatDate(nextWeekStart);
  const formattedEndDate = formatDate(nextWeekEnd);
  return { start: formattedStartDate, end: formattedEndDate };
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDeadline(category, includeStart = false) {
  switch (category)
  {
    case '오늘':
      return getToday();
    case '내일':
      return getTomorrow();
    case '이번 주':
      return getThisWeek();
    case '다음 주':
      const nextWeek = getNextWeek();
      return includeStart ? nextWeek : nextWeek.end;
    default:
      return null;
  }
}