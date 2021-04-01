import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '../ListItem/ListItem';
import { selectFilteredList } from '../../store';

export default function List() {
  const list = useSelector(selectFilteredList);
  function renderList() {
    if (!list.length) {
      return 'Нет дел в списке';
    }
    return (
      <>
        {list.map(item => (
          <ListItem key={item.id} title={item.title} id={item.id} isChecked={item.isChecked} />
        ))}
      </>
    );
  }
  return <div data-testid="list">{renderList()}</div>;
}
