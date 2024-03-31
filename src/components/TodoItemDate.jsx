import React from 'react';
import { getDate } from '../js/CommonFunction';

export default function TodoItemDate({ deadline }) {
  return <span className={deadline < getDate() ? 'text-red-500' : ''}></span>;
}
