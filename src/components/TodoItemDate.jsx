import React from 'react';
import { getToday } from '../js/CommonFunction';

export default function TodoItemDate({ deadline }) {
  return <span className={deadline < getToday() ? 'text-red-500' : ''}></span>;
}
