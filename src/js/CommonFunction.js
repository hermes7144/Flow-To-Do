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
  const dayOfWeek = currentDate.getDay(); // 현재 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const nextWeekStart = new Date(currentDate); // 다음 주의 시작 날짜
  nextWeekStart.setDate(currentDate.getDate() + (8 - dayOfWeek)); // 현재 요일을 기준으로 다음 주의 시작일을 계산
  const nextWeekEnd = new Date(nextWeekStart); // 다음 주의 마지막 날짜
  nextWeekEnd.setDate(nextWeekStart.getDate() + 6); // 다음 주의 시작일로부터 6일 후가 다음 주의 마지막일

  // 시작 날짜와 마지막 날짜를 포맷하여 문자열로 반환
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

export function formatMonthAndDay(deadline) {
  const date = new Date(deadline);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}월 ${day}일`

}