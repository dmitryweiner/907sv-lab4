import React from 'react';
import ListItem from '../ListItem/ListItem';
import { selectFilteredList } from '../../store';
import { useSelector } from 'react-redux';

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
