import React from 'react';
import { getDate } from '../js/CommonFunction';

export default function TodoDate({ date }) {
  let displayDate;
  if (date === getDate(-1)) {
    displayDate = '어제';
  } else if (date === getDate()) {
    displayDate = '오늘';
  } else if (date === getDate(1)) {
    displayDate = '내일';
  } else {
    displayDate = new Date(date).toLocaleDateString('ko', { day: 'numeric', month: 'short' });
  }

  return <span className={`${date < getDate() && 'text-red-500'}`}>{displayDate}</span>;
}
