


export function getDate(offset = 0) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + offset);
  return formatDate(targetDate);
}

function getWeekRangeRelativeTo(weekOffset) {
  const date = new Date();
  const dayOfWeek = date.getDay() || 7;
  const weekStart = new Date(date);
  const daysToAdd = (weekOffset * 7) - dayOfWeek + 1;
  weekStart.setDate(date.getDate() + daysToAdd);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return {
    start: formatDate(weekStart),
    end: formatDate(weekEnd)
  };
}

export function getThisWeek() {
  return getWeekRangeRelativeTo(0); // Get the current week
}

export function getNextWeek() {
  return getWeekRangeRelativeTo(1); // Get the next week
}

function formatDate(date) {
  return new Date(date).toISOString().substring(0, 10);
}

export function getDeadline(category, includeStart = false) {
  switch (category)
  {
    case '오늘':
      return getDate();
    case '내일':
      return getDate(1)
    case '이번 주':
      return getThisWeek().end;
    case '다음 주':
      const nextWeek = getNextWeek();
      return includeStart ? nextWeek : nextWeek.end;
    default:
      return null;
  }
}