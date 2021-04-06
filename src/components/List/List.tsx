import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from '../ListItem/ListItem';
import { selectFilteredList } from '../../selector';

export default function List() {
  const listState = useSelector(selectFilteredList);
  function renderList() {
    if (!listState.list.length) {
      return 'Нет дел в списке';
    }
    return (
      <>
        {listState.list.map(item => (
          <ListItem key={item.id} title={item.title} id={item.id} isChecked={item.isChecked} />
        ))}
      </>
    );
  }
  return <div data-testid="list">{renderList()}</div>;
}
