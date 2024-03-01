import React from 'react';
import { formatMonthAndDay, getToday, getTomorrow } from '../js/CommonFunction';

export default function TodoItemDate({ deadline }) {
  return <span className={deadline < getToday() ? 'text-red-500' : ''}></span>;
}
