import React from 'react';
import { useSelector } from 'react-redux';
import { getFilteredItemsCount } from '../../selectors/getFilteredItemsCount';

function Counter() {
  const number = useSelector(getFilteredItemsCount);
  return <span>Всего: {number}</span>;
}

export default Counter;
