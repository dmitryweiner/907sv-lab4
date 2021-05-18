import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './ListItem';

export default function List() {
  const list = useSelector(state => state.list);

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
