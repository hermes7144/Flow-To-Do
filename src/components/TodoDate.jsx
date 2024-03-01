import React from 'react';
import { formatMonthAndDay, getToday, getTomorrow } from '../js/CommonFunction';

export default function TodoDate({ date }) {
  const today = getToday();
  const tomorrow = getTomorrow();

  let displayDate;
  if (date === today) {
    displayDate = '오늘';
  } else if (date === tomorrow) {
    displayDate = '내일';
  } else {
    displayDate = formatMonthAndDay(date);
  }

  return <>{displayDate}</>;
}
