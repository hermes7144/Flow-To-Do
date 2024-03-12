import React from 'react';
import { getToday, getTomorrow } from '../js/CommonFunction';

export default function TodoDate({ date }) {
  const today = getToday();
  const tomorrow = getTomorrow();

  let displayDate;
  if (date === today) {
    displayDate = '오늘';
  } else if (date === tomorrow) {
    displayDate = '내일';
  } else {
    displayDate = new Date(date).toLocaleDateString('ko', { day: 'numeric', month: 'short' });
  }

  return <>{displayDate}</>;
}
