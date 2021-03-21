import React from 'react';
import { useSelector } from 'react-redux';
import { countListItems } from '../../store/store';

function Counter() {
  const number = useSelector(countListItems);
  return <span>Всего: {number}</span>;
}

export default Counter;
