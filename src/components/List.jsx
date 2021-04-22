import React from 'react';
import ListItem from './ListItem';

export default function List({ list, dispatch }) {
  if (list.length === 0) {
    return <div>Список пуст</div>;
  }
  return (
    <ul>
      {list.map(item => (
        <ListItem
          id={item.id}
          key={item.id}
          title={item.title}
          isChecked={item.isChecked}
          dispatch={dispatch}
        />
      ))}
    </ul>
  );
}
