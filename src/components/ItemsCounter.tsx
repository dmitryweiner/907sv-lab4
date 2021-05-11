import React from 'react';
import { selectItemsCount } from '../store/store';
import { useSelector } from 'react-redux';

export default function ItemsCounter() {
  const count = useSelector(selectItemsCount);

  return <span>Ваши дела: {count}</span>;
}
