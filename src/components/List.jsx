import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './ListItem';
import { selectFilteredList } from '../store';

export default function List() {
  const list = useSelector(selectFilteredList);

  if (list.length === 0) {
    return <div>Список пуст</div>;
  }
  return (
    <ul>
      {list.map(item => (
        <ListItem id={item.id} key={item.id} title={item.title} isChecked={item.isChecked} />
      ))}
    </ul>
  );
}
